const Lembrete = require('../models/lembreteModel')

module.exports.index = (req, res) => {
    res.render('lembrete')
}

module.exports.edit = (req, res) => {
    
    //Aqui eu preciso salvar o index do lembrete em uma flash
    console.log("Index do lembrete a ser editado:",req.params.index) 
    const lembretes = req.session.user.lembrete
    const indexLembreteEdited = req.params.index
    res.render('lembreteEdit', {lembretes, indexLembreteEdited})

}

module.exports.edited = async(req, res) => {
    
    //Aqui eu preciso editar o lembrete no index informado no DB
    console.log("Tentando editar o lembrete no index:",req.params.index)
    console.log("Value do novo lembrete:",req.body.lembrete)
    if(!req.params.index) return res.render('404') 

    const lembrete = new Lembrete(req.body, res.locals.user.email, req.session.user.lembrete)
    const dbAtualizadoAposEDIT = await lembrete.edit(req.params, res.locals.user, req.body.lembrete) 
    
    req.session.user.lembrete = []
    dbAtualizadoAposEDIT.lembrete.forEach((element, index) => {
        req.session.user.lembrete[index] = element        
    });

    req.session.save(() => res.redirect('/'))

}

//Para acessar os lembretes do usuário: req.session.user.lembrete
//Então, eu passo essa informação como parâmetro, e aqui posso recuperar
//com um lembrete.lembretes e aplicar essa informação a um flash da seguinte forma:
//  req.flash('lembretes', lembrete.lembretes)
//E irá funcionar no EJS pq no middleware eu já criei um req.locals que recebe esse flash
//daí, no EJS não posso esquecer de colocar um foreach para printar cada elemento do array

module.exports.register = async (req, res) => {
    // await console.log("SessionEmail no lembreteController.register:",res.locals.user.email)
    
    const lembrete = new Lembrete(req.body, res.locals.user.email, req.session.user.lembrete)
    await lembrete.register()
    

    // await console.log("Lembretes do usuário no lembreteController.register1:",req.session.user.lembrete)
    // await console.log("Lembretes do usuário salvos na classe do model:",lembrete.lembretes)
    //await console.log("req.session.user:",req.session.user)
    //req.session.user.lembrete = lembrete.lembretes
    req.flash('lembretes', req.session.user.lembrete) //Preciso dar um jeito de validar isso pela classe Lembrete
    req.session.save(() => res.redirect('/'))         //para a validação ficar no model 
}

module.exports.delete = async function(req, res) {
    if(!req.params.index) return res.render('404') 
    console.log(`Deletar o lembrete de index ${req.params.index} do usuário ${res.locals.user.email}`)
    
    const lembrete = new Lembrete(req.body, res.locals.user.email, req.session.user.lembrete)
    const dbAtualizadoAposDELETE = await lembrete.delete(req.params.index, res.locals.user) 
    
    req.session.user.lembrete = []
    dbAtualizadoAposDELETE.lembrete.forEach((element, index) => {
        req.session.user.lembrete[index] = element        
    });

    console.log(`index ${req.params.index} do usuário ${res.locals.user.email} após o destroy`)
    console.log("Lembretes na Session:",req.session.user.lembrete)
    //Não preciso acionar o flash aqui... só preciso atualizar a Session e redirecionar para a home
    console.log("Lembretes na flag:",dbAtualizadoAposDELETE.lembrete)
    req.session.save(() => res.redirect('/'))
}