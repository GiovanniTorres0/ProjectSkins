FROM node:18-alpine

WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apk add --no-cache libc6-compat

# Copiar arquivos de configuração
COPY package*.json ./
COPY config/vite.config.js ./
COPY src/index.html ./

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY . .

# Instalar TailwindCSS e suas dependências
RUN npm install -D tailwindcss postcss autoprefixer
RUN npx tailwindcss init -p

EXPOSE 5173

CMD ["npm", "run", "dev"]