# ProjectSkins

### Fluxo do Dia-a-Dia

## Iniciando o Dia
1. Abrir Docker Desktop
2. Abrir VSCode
3. No terminal do VSCode:
```bash
docker-compose up
```

## Durante o Desenvolvimento
1. Edite os arquivos normalmente no VSCode
2. As alterações são refletidas automaticamente (hot reload)
3. Se instalar novas dependências:
```bash
docker-compose exec web npm install nome-do-pacote
```

## Problemas Comuns e Soluções
1. Se a aplicação não atualizar:
```bash
docker-compose down
docker-compose up --build
```

2. Se precisar reinstalar node_modules:
```bash
# Parar containers
docker-compose down

# Remover node_modules
rm -rf node_modules

# Reconstruir
docker-compose up --build
```

3. Se precisar ver logs específicos:
```bash
docker-compose logs web
```

## Finalizando o Dia
1. No terminal: Ctrl + C ou `docker-compose down`
2. Pode fechar o Docker Desktop se quiser

## Dicas Importantes
- Mantenha o Docker Desktop aberto durante o desenvolvimento
- Use `docker-compose up --build` após mudar dependências
- Os arquivos da sua máquina são sincronizados com o container
- Não precisa reiniciar para ver alterações no código
- Use `docker ps` para ver se os containers estão rodando