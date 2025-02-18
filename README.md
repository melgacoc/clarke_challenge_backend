# Clarke Challenge Backend

## Funcionalidades

- **Autenticação de Usuários**: Registre e autentique usuários com senhas criptografadas.
- **Gerenciamento de Contas**: Crie e gerencie contas de usuários e fornecedores.
- **Contratos**: Assine contratos de fornecimento de energia.
- **Avaliação**: Avalie fornecedores.

## Tecnologias
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Graphql](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## Primeiros Passos

### Pré-requisitos

- Docker e Docker Compose instalados
- NPM instalador

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/yourusername/clarke_challenge_backend.git
cd clarke_challenge_backend
```

2. Crie um arquivo .env:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=graphql_db

APP_PORT=4000
APP_SECRET_KEY=my_secret_key
```

3. Suba os containers:
```bash
docker-compose up --build
```

### GraphQl
Ao subir os containers o endpoint para o playground deve estar disponível em http://localhost:3000/graphql
