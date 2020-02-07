const Login = require('../models/LoginModel')

module.exports.index = (req, res) => {
    console.log(req.session.user)
    if(req.session.user) return res.redirect('/')
    res.render('login')
}

module.exports.register = async function(req, res){
    //Esses paranauês com o login aqui e no LoginModel é simplesmente para a validação ficar no model, e 
    //não no controllers
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
        req.session.save(() => res.redirect('back'))
        

    }catch(e){
        return res.render('404')
    }
    
}

module.exports.logout = function(req, res){
    req.session.destroy()
    res.redirect('/')
}