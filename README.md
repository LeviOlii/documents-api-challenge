# 🚀 API de Gerenciamento de Documentos com IA

API RESTful para upload, consulta e análise de documentos com autenticação JWT.  Permite que usuários enviem arquivos (CSV ou PDF), recuperem registros extraídos, e simulem consultas via IA.

---

## 🔧 Tecnologias Utilizadas

- **Backend:** Node.js + Express
- **Banco de Dados:** PostgreSQL (via Docker)
- **ORM:** Prisma
- **Autenticação:** JWT
- **Upload de Arquivos:** Multer
- **Documentação:** Swagger UI
- **Containerização:** Docker + Docker Compose

---

## ⚙️ Como Rodar o Projeto

### ✅ Pré-requisitos

- [Docker](https://www.docker.com/products/docker-desktop) instalado (inclui Docker Compose)
- [Git](https://git-scm.com/) instalado

> ❗ Não é necessário instalar o PostgreSQL nem o Node.js manualmente — tudo será executado via Docker.

---

### 📁 1. Clone o repositório

```bash
git clone https://github.com/LeviOlii/documents-api-challenge.git
cd documents-api-challenge

```

---

### 🛠️ 2. Crie um arquivo .env
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL=postgresql://postgres:senha_segura@db:5432/docmanager_db?schema=public
JWT_SECRET=uma_senha_muito_segura
DB_USER=postgres
DB_PASSWORD=senha_segura
DB_NAME=docmanager_db
```
---

### 🐳 3. Suba os containers com Docker Compose

```bash
docker compose up -d
```
Esse comando irá
* Criar e iniciar um container PostgreSQL
* Criar e iniciar o servidor Node.js
* Conectar a API ao banco de dados automaticamente

---

### 📖 4. Acesse a documentação da API (Swagger UI)

```bash
http://localhost:3000/api-docs
```
Lá você pode explorar e testar todos os endpoints da API com autenticação JWT, apenas clicando em "Try it out", depois de selecionar um endpoint.

---

## 🧪 Fluxo de Uso da API

### 🔐 1. Registro de usuário
**POST** */auth/register*  
Corpo da requisição (JSON):

```json
{
  "name": "Levi",
  "email": "levi@email.com",
  "password": "123456"
}

```

---

### 🔑 2. Login
**POST** */auth/login*  
Corpo da requisição:

```json
{
  "email": "levi@email.com",
  "password": "123456"
}

```

Resposta:

```json
{
  "token": "seu_token_jwt_aqui"
}
```

Copie o token e clique em **Authorize** no Swagger para colar:

```nginx
Bearer seu_token_jwt_aqui
```

---

### 🙋‍♂️ 3. Ver informações do usuário autenticado
**GET** */auth/me*  
Retorna o ID e o e-mail do usuário logado

---

### 📤 4. Upload de documento (CSV ou PDF)
**POST** */datasets/upload*  
Faz o upload de um documento do usuário logado atualmente

---

### 📂 5. Listar datasets do usuário  
**GET** */datasets*  
Retorna todos os datasets registrados no banco de dados

---

### 📄 6. Ver registros de um dataset
**GET** */datasets/{id}/records*  
Substitua *id* pelo ID do dataset que se deseja consultar

---

### 🔎 7. Pesquisar dentro dos registros
**GET** */datasets/records/search?query=termo*  
Retorna todos os documentos do usuário que contenham o termo pesquisado  
Exemplo:
```bash
/datasets/records/search?query=filmes
```

---

### Encerrando
Para parar e remover os containers:

```bash
docker compose down
```
---

## 🎯 Considerações Finais

Essa API foi desenvolvida com foco em organização, segurança e clareza no código.  

Se tiver qualquer dúvida, sugestão ou quiser bater um papo técnico, estou à disposição! 😄

Feito com 💻, ☕ e muita dedicação por mim.
