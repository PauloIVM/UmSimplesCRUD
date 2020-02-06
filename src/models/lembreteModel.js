const mongoose = require('mongoose');

const LembreteSchema = new mongoose.Schema({
  lembrete: { type: String, required: true }
});

const lembreteModel = mongoose.model('LembreteDB', LembreteSchema);

class lembrete {
  constructor(body){
    this.body = body
  }

  async register(){
    try{  
      this.user = await lembreteModel.create(this.body)
    }catch(e){console.log("Erro no this.user await -- ",e)}
  }
}

module.exports = lembrete;
