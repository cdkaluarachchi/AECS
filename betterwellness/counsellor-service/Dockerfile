FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=8002
ENV JWT_SECRET=asdfasdwaewaew2
ENV MONGO_URI=mongodb+srv://cdkaluarachchi:sjhs4k@betterwellness.bdn3m38.mongodb.net/?retryWrites=true&w=majority&appName=betterwellness

CMD ["npm", "start"]