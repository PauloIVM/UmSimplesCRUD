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

class Lembrete {
  constructor(body, userEmail, lembretes){
    this.body = body
    this.userEmail = userEmail
    this.lembretes = lembretes.push(body.lembrete)
    this.user = null
  }
  //this.body.lembrete
  async register(){
    console.log("Tentei adicionar o lembrete:"+this.body.lembrete)
    //Tenho que criar aqui uma validação para a quantidade de caracteres no lembrete
    try{  
      await LoginModel.loginModel.updateOne({email: this.userEmail},{$push: {lembrete: this.body.lembrete}})
      //console.log("Schema do lembrete:",this.user)
    }catch(e){console.log("Erro no registro de lembrete ")}
  }
}

module.exports = Lembrete;
