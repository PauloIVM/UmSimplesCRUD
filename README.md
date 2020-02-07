# UmSimplesCRUD
A ideia deste projeto é montar um CRUD simples, para colocar em prática conhecimentos que adquiri recentemente em um curso de desenvolvimento web. No momento, está implementado apenas um CREATE e o READ de usuários; mas ainda pretendo acrescentar as funcionalidades de UPDATE e DELETE.

Caso vc queira clonar o projeto, seguem algumas informações:

  ->Estou usando o MongoDB Atlas como banco de dados. Para isso, criei um arquivo .env com a string de conexão ao servidor do MongoDB Atlas; utilizando o dotenv (desta forma a minha senha ao banco de dados não aparece no github). Caso vc queira usar o programa, crie um .env e coloque dentro a variável CONECTIONSTRING recebendo sua string de conexão do MngoDB Atlas; ficaria algo do tipo: CONECTIONSTRING = mongodb+srv://seuUsuario:suaSenhaETomeCuidadoComOURLEncoded@cluster0-piopl.mongodb.net/nomeDoDB?retryWrites=true&w=majority
  
  ->Tentei seguir a arquitetura MVC, e, utilizei diversas dependências como: express, EJS, helmet, mongoose, validator, webpack, bcryptjs, dentre outras.
  
  [![](http://img.youtube.com/vi/5kpXwQSLuH8/0.jpg)](http://www.youtube.com/watch?v=5kpXwQSLuH8 "CRUD simples com NodeJS")
  
  
