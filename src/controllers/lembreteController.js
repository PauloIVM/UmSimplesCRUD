const Lembrete = require('../models/lembreteModel')

module.exports.index = (req, res) => {
    res.render('lembrete')
}

module.exports.register = async (req, res) => {
    
    const lembrete = new Lembrete(req.body)
    await lembrete.register()
    res.redirect('/')
}