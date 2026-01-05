from node:18 
RUn apt-get update && apt-get install -y tesseract-ocr tesseract-ocr-eng tesseract-ocr-tha
WORKDIR /app 
COPY package*.json ./
RUN npm install 
COPY . . 
EXPOSE 8080 
CMD ["npm run dev"]