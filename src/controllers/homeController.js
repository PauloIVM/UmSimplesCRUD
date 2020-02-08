exports.index = (req, res) => {
  if(req.session.user){
    req.flash('lembretes', req.session.user.lembrete)
  }
  
  res.render('index');
  return;
};

