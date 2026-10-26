# Catálogo de raças de cachorro

API REST em Node.js, Express e Prisma, usando MySQL.

## Configuração

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para `.env` e defina um valor privado para `API_TOKEN`.
3. Crie/atualize o banco MySQL com `npm run prisma:migrate`.
4. Opcional: carregue as raças iniciais com `npm run prisma:seed`.
5. Inicie a API com `npm run dev` ou `npm start`.

A documentação Swagger fica em `/api-docs`. As rotas de escrita (`POST`, `PATCH` e `DELETE /racas`) exigem `Authorization: Bearer SEU_TOKEN`.

Não versione o arquivo `.env`, pois ele contém o token e a URL de conexão. As migrações em `prisma/migrations` devem ser versionadas.
