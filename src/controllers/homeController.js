module.exports.index = async(req, res) => {
  console.log("Redirecionou para home, e o user é:"+req.session.user)
  if((typeof req.session.user === "undefined")||(req.session.user.lembrete.length == 0)){
    res.render('index')
    return 
  }


  async function atualizaLembretesFlash() {
    req.flash('lembretes', req.session.user.lembrete) 
    const lembretes = req.session.user.lembrete
    res.render('index', {lembretes})
    return 
    /*Dentro desta função, eu estava utilizando o seguinte código:
    
    req.flash('lembretes', req.session.user.lembrete) 
    res.render('index')
    return
    
    Contudo, isto me gerava um problema: algumas vezes ao se redirecionar a página, mesmo com
    o req.flash tendo sido executado, por alguma razão o res.render pegava um EJS que ainda 
    não havia recebido este flash (lembretes)... e a página index aparecia sem nenhum lembrete.
    Para resolver isso, basou renderizar a página passando a constante como fiz acima.

    Estou comentando isso somente para não me esquecer do motivo deste código
    */
  }
  await console.log("Lembrtes no homeController:"+req.session.user.lembrete)
  await atualizaLembretesFlash()
  
};

// exports.index = async(req, res) => {
//   const contatos = await Contato.buscaContatos();
//   res.render('index', { contatos });
// };

