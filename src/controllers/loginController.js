const Login = require('../models/LoginModel')

module.exports.index = (req, res) => {
    // console.log("req.session.user:",req.session.user)
    if(req.session.user) return res.redirect('/')
    res.render('login')
}

module.exports.register = async function(req, res){
    try{
        const login = new Login.login(req.body)
        await login.register()
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(() => res.redirect('back'))
            return
        }
       
        req.flash('success', 'Usuário criado com sucesso')
        req.session.save(() => res.redirect('back'))
        

    }catch(e){
        return res.render('404')
    }
    
}

module.exports.login = async function(req, res){
    try{
        const login = new Login.login(req.body)
        await login.login()
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(() => res.redirect('back'))
            return
        }
        
        req.flash('success', 'Usuário logado com sucesso')
        req.session.user = login.user
        
        if(req.session.user.lembrete.length !== 0){
            req.flash('lembretes', req.session.user.lembrete)
            console.log("Entrou no if do loginController")
        }
      
        req.session.save(() => res.redirect('back'))
        

    }catch(e){
        console.log("Erro no loginController:",e)
        return res.render('404')
    }
    
}

module.exports.logout = function(req, res){
    req.session.destroy()
    res.redirect('/')
}