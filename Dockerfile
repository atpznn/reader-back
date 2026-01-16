# Stage 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# ลงเฉพาะ production dependencies เพื่อประหยัดพื้นที่
RUN npm install --only=production
# Stage 2: Production stage
FROM node:18-alpine
WORKDIR /app

# 1. ติดตั้ง tesseract-ocr และ wget (ต้องมี wget ถึงจะโหลดไฟล์ได้)
RUN apk add --no-cache tesseract-ocr wget

# 2. ตำแหน่งของ Alpine ปกติอยู่ที่ /usr/share/tessdata/ 
# เราจะโหลดมาวางที่นี่ (ไม่ต้องลง tesseract-ocr-data-tha จาก apk เพราะเราจะโหลด fast มาทับอยู่แล้ว)
RUN mkdir -p /usr/share/tessdata && \
    wget https://github.com/tesseract-ocr/tessdata_fast/raw/main/eng.traineddata -O /usr/share/tessdata/eng.traineddata && \
    wget https://github.com/tesseract-ocr/tessdata_fast/raw/main/tha.traineddata -O /usr/share/tessdata/tha.traineddata

# 3. บังคับให้ Node.js/Tesseract รู้ว่าไฟล์อยู่ที่ไหน
ENV TESSDATA_PREFIX=/usr/share/tessdata/
ENV OMP_THREAD_LIMIT=1

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 8080
CMD ["npm", "start"]