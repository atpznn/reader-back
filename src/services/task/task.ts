
export type TaskStatus = 'success' | 'process' | 'no-work' | 'waiting'
class Task<T> {
    private data: T[] = []
    private error: string = ''
    private status: TaskStatus = 'no-work'
    constructor(private id: string) {
        this.status = 'waiting'
    }
    async todos(fns: (() => Promise<T[]>)[]) {
        this.status = 'process'
        try {
            for (const fn of fns) {
                this.data = [...this.data, ...await fn()]
            }
        }
        catch (ex) {
            this.error = `${ex}`
        }
        this.status = 'success'

    }
    setStatus(status: TaskStatus) {
        this.status = status
    }

    getid() {
        return this.id
    }
    setError(error: string) {
        this.error = error
        this.setStatus('success')
    }
    getData() {
        if (this.error != '') throw new Error(this.error)
        return { data: this.data, status: this.status }
    }
}

export class TaskManager {
    private tasks: Map<string, Task<unknown>> = new Map()
    private queue: Promise<void> = Promise.resolve();
    constructor(private maxTasks: number) { }
    private readonly TTL = 10 * 60 * 2000;
    spawnNewTask(taskType: string, fns: (() => Promise<unknown[]>)[]) {
        const taskId = `${taskType}-${this.tasks.size + 1}`
        const task = new Task(taskId)
        this.tasks.set(taskId, task)
        if (this.tasks.size >= this.maxTasks) {
            const firstKey = this.tasks.keys().next().value;
            if (firstKey) {
                this.tasks.delete(firstKey);
            }
        }
        this.queue = this.queue.then(async () => {
            await task.todos(fns)
            setTimeout(() => {
                this.killTask(taskId);
            }, this.TTL);
        });
        return task.getid()
    }
    killTask(id: string) {
        this.tasks.delete(id)
    }
    getTaskId(id: string) {
        const task = this.tasks.get(id)
        return task
    }
}