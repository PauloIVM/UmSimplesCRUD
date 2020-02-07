const Lembrete = require('../models/lembreteModel')

module.exports.index = (req, res) => {
    res.render('lembrete')
}

module.exports.register = async (req, res) => {
    await console.log("Session no lembreteController.register:",res.locals.user.email)
    const lembrete = new Lembrete(req.body, res.locals.user.email)
    await lembrete.register()
    res.redirect('/')
}