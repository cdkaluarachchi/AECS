FROM node:18-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json \
    && npm install

COPY . .

ENV PORT=8000
ENV JWT_SECRET=asdfasdwaewaew2
ENV MONGO_URI=mongodb+srv://cdkaluarachchi:sjhs4k@betterwellness.bdn3m38.mongodb.net/?retryWrites=true&w=majority&appName=betterwellness

CMD ["npm", "start"]
