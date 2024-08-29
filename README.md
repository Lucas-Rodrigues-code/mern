# Breaking News API

## Descrição

A **Breaking News API** é uma API simples desenvolvida com a stack MERN (MongoDB, Express, React, Node.js), utilizando o MongoDB como banco de dados e o Mongoose para a criação de models. Esta API tem como objetivo fornecer as últimas notícias de forma prática e rápida.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework web para Node.js, utilizado para criar a API.
- **MongoDB**: Banco de dados NoSQL, utilizado para armazenar as notícias.
- **Mongoose**: Biblioteca para modelagem de dados no MongoDB, utilizada para criar os modelos da API.

## Funcionalidades

Atualmente, a Breaking News API é simples e possui as seguintes funcionalidades:

- **Criar notícia**: Permite adicionar uma nova notícia ao banco de dados.
- **Listar notícias**: Retorna uma lista de todas as notícias disponíveis.
- **Buscar notícia**: Permite buscar uma notícia específica por ID.
- **Atualizar notícia**: Permite atualizar uma notícia existente.
- **Deletar notícia**: Permite remover uma notícia do banco de dados.

## Como Usar

1. **Clone o repositório**:

   ```
   git clone https://github.com/seu-usuario/breaking-news-api.git

   ```

   ```
    cd breaking-news-api
    npm install
   ```

2. **Instale as dependências**:

   ```
       npm install
   ```

3. **Configure o MongoDB**:

Certifique-se de que o MongoDB está instalado e em execução.
Crie um arquivo .env na raiz do projeto e adicione a string de conexão do MongoDB, conforme o env.example:

4. **Inicie o servidor**:

   ```
     npm run dev
   ```

5. **Utilize a API**:

Acesse a API em http://localhost:PORT.
Utilize ferramentas como Postman ou Insomnia para testar os endpoints.

## Próximos Passos

- Refatorar para TypeScript: Pretendo migrar todo o código para TypeScript para aproveitar os benefícios de tipagem estática, como maior segurança e previsibilidade no desenvolvimento.

- Implementar novas funcionalidades:

## Documentação

Acesse a API em http://localhost:PORT/docs.