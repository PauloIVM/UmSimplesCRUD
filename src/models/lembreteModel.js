const mongoose = require('mongoose');
const LoginModel = require('./LoginModel')
// const LembreteSchema = new mongoose.Schema({
//   lembrete: { type: String, required: true }
// });

// const lembreteModel = mongoose.model('LembreteDB', LembreteSchema);

// const LoginSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   password: { type: String, required: true }
// });

//Acredito que devo colocar a parte de cima em um módulo e exportar somente essa parte de baixo
// const LoginModel = mongoose.model('LoginDB', LoginSchema);


//Primeiro eu preciso descobrir como encontrar aqui o email do usuário nesta sessão
//Depois, eu preciso descobrir como dar um update com o mongoose, acredito que seria algo do tipo:
//db.estados.update({sigla: "AL"},{$set: {cidades: [{nome: "Sergipe"}]}})

class lembrete {
  constructor(body, userEmail){
    this.body = body
    this.userEmail = userEmail
  }
  //this.body.lembrete
  async register(){
    try{  
      await LoginModel.loginModel.updateOne({email: "$this.userEmail"},{$set: {lembrete: "$this.body.lembrete"}})
    }catch(e){console.log("Erro no registro de lembrete ")}
  }
}

module.exports = lembrete;
