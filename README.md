# api-backend-dev

Backend Dev é uma API robusta desenvolvida em Node.js que serve como backend para uma aplicação inspirada no Instagram. Este projeto foi criado como parte de um bootcamp para demonstrar boas práticas de desenvolvimento de APIs RESTful.

Backend Dev is a robust API developed in Node.js that serves as the backend for an Instagram-inspired application. This project was created as part of a bootcamp to demonstrate best practices in RESTful API development.

## Instalação / Installation

1. Clone o repositório / Clone the repository:

`git clone https://github.com/nikumu/api-backend-dev`


2. Entre no diretório do projeto / Enter the project directory:

`cd api-backend-dev`


3. Instale as dependências / Install the dependencies:

`npm install`


4. Configure as variáveis de ambiente / Set up environment variables:
- Crie um arquivo `.env` na raiz do projeto / Create a `.env` file in the project root
- Adicione as variáveis necessárias (consulte `.env.example` se disponível) / Add the necessary variables (check `.env.example` if available)

5. Inicie o servidor de desenvolvimento / Start the development server:

`npm run dev`


## Uso / Usage

Após iniciar o servidor, a API estará disponível em `http://localhost:3000` (ou a porta que você configurou).

After starting the server, the API will be available at `http://localhost:3000` (or the port you've configured).

### Endpoints principais / Main endpoints:

- `POST /users`: Criar um novo usuário / Create a new user
- `POST /login`: Autenticar um usuário / Authenticate a user
- `GET /posts`: Listar posts / List posts
- `POST /posts`: Criar um novo post / Create a new post
- `POST /posts/:id/like`: Curtir um post / Like a post
- `POST /posts/:id/comment`: Comentar em um post / Comment on a post

## Contribuindo / Contributing

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter pull requests.

Contributions are welcome! Please read the contribution guidelines before submitting pull requests.

## Licença / License

Este projeto está licenciado sob a [Licença MIT](LICENSE).

This project is licensed under the [MIT License](LICENSE).