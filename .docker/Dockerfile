FROM node:18-alpine

WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apk add --no-cache libc6-compat

# Copiar apenas os arquivos necessários para instalar dependências
COPY package*.json ./

# Instalar dependências incluindo TailwindCSS
RUN npm install && \
    npm install -D tailwindcss postcss autoprefixer && \
    npx tailwindcss init -p

# Copiar os arquivos de configuração
COPY tsconfig*.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY config/ ./config/

# Copiar o código fonte
COPY src/ ./src/

# Expor a porta
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]