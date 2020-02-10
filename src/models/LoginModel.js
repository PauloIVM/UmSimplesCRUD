const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  lembrete: { type: Array, required: false}
});

const LoginModel = mongoose.model('LoginDB', LoginSchema);

class Login {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
        this.body.lembrete = ["Alguma coisa"]
    }

    async login(){
        this.valida()
        if(this.errors.length > 0){
            return
        }
        this.user = await LoginModel.findOne({email: this.body.email})

        if(!this.user){
            this.errors.push('Usuário não existe')
            return
        }
        
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha incorreta')
            this.user = null
            return 
        }
    }

    async register(){
        this.valida()
        await this.userExists()
        if(this.errors.length > 0){
            return
        }

        try{
            const salt = bcryptjs.genSaltSync()
            this.body.password = bcryptjs.hashSync(this.body.password, salt)
            this.user = await LoginModel.create(this.body)
            await LoginModel.updateOne({email: this.body.email},{$push: {lembrete: this.body.lembrete}})
        }catch(e){console.log("Erro no this.user await -- ",e)}
        
    }

    async userExists(){
        const user = await LoginModel.findOne({email: this.body.email})
        if(user){
            this.errors.push('Usuário já existe')
        }
    }

    valida(){
        this.cleanUp()
        if(!validator.isEmail(this.body.email)){
            this.errors.push('Email Inválido')
        }
        if(this.body.password.length < 6 || this.body.password.length > 50){
            this.errors.push('Senha Inválida (Deve ter entre 6 a 20 caracteres)')
        }
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }   
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports.login = Login;
module.exports.loginModel = LoginModel;
