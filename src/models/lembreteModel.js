const mongoose = require('mongoose');
const LoginModel = require('./LoginModel')

class Lembrete {
  constructor(body, userEmail, lembretes){
    this.body = body
    this.userEmail = userEmail
    this.lembretes = lembretes.push(body.lembrete)
    this.user = null
  }
  //this.body.lembrete
  async register(){
    // console.log("Tentei adicionar o lembrete:"+this.body.lembrete)
    //Tenho que criar aqui uma validação para a quantidade de caracteres no lembrete
    try{  
      await LoginModel.loginModel.updateOne({email: this.userEmail},{$push: {lembrete: this.body.lembrete}})
      //console.log("Schema do lembrete:",this.user)
    }catch(e){console.log("Erro no registro de lembrete ")}
  }

  async delete(){
    // try {
    //   await LoginModel.loginModel.deleteOne()
    // } catch (error) {
      
    // }
  }
  
}
// Contato.buscaContatos = async function() {
//   const contatos = await ContatoModel.find()
//     .sort({ criadoEm: -1 });
//   return contatos;
// };
module.exports = Lembrete;
