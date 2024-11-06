FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV VITE_HOST=0.0.0.0

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]