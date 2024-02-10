

# Node.js Authentication with JWT MedCof

Este é teste na criação de uma aplicação em Node.js que demonstra autenticação usando JSON Web Tokens (JWT). 

## Funcionalidades

- Rota de autenticação que retorna um token JWT após a verificação das credenciais.
- Rota protegida que requer um token JWT válido para acessar.

## Pré-requisitos

- Node.js instalado (https://nodejs.org/)
- NPM (Node Package Manager) ou Yarn

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/Willsaalves/MedCof.git
cd MedCof
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

## Execução

Execute a aplicação:  

```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em `http://localhost:3000`.


## Rotas

### 1. Autenticação

**Endpoint:**

```
POST /login
```

**Payload:**

```json
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

**Resposta de Sucesso:**

```json
{
  "token": "seu_token_jwt"
}
```

### 2. Rota Protegida

**Endpoint:**

```
GET /protected
```

**Headers:**

```
Authorization: seu_token_jwt
```

**Resposta de Sucesso:**

```json
{
  
}
```

## Testes Unitários

A API possui testes automatizados usando o framework Jest e a biblioteca Axios para realizar requisições HTTP. Execute os testes com o seguinte comando:

```bash
npm test
# ou
yarn test
```

Isso executará os testes localmente.

