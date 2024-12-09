FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache gcompat

COPY package*.json ./

RUN npm install && \
    npm install -D tailwindcss postcss autoprefixer && \
    npm install -D @types/node && \
    npx tailwindcss init -p

COPY tsconfig*.json ./
COPY config/postcss.config.js ./  
COPY config/tailwind.config.js ./
COPY config/vite.config.js ./

COPY src/ ./src/

EXPOSE 5173

CMD ["npm", "run", "dev"]