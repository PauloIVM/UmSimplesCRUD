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

  async edit(params, user, novoLembrete){
    try {
      const index = params.index
      const antigoLembrete = user.lembrete[index]
      const email = user.email


      //Deletando o antigo lembrete

      await LoginModel.loginModel.updateOne({email: email},{$pull: {lembrete: antigoLembrete}})
      //Adicionando o lembrete editado

      await LoginModel.loginModel.updateOne({email: email},{$push: {lembrete: novoLembrete}})

      //await LoginModel.loginModel.replaceOne({email: email},{lembrete: antigoLembrete, lembrete: novoLembrete})
 
      return await LoginModel.loginModel.findOne({email: email})

    } catch (error) {
      console.log("Falhou no edit() do lembreteModel")  
    }
  }

  async delete(index, user){
    try {
      const email = user.email
      const lembrete = user.lembrete[index]
      
      // await LoginModel.loginModel.updateOne({email: email},{$pull: {lembrete: "um"}})
      await LoginModel.loginModel.updateOne({email: email},{$pull: {lembrete: lembrete}})
      return await LoginModel.loginModel.findOne({email: email})
    } catch (error) {
      console.log("Falhou no delete() do lembreteModel")
      console.log("user.lembrete[index]:",user.lembrete[index])
    }
  }
  
}
// Contato.buscaContatos = async function() {
//   const contatos = await ContatoModel.find()
//     .sort({ criadoEm: -1 });
//   return contatos;
// };
module.exports = Lembrete;
