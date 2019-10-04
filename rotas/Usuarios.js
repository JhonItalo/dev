const express = require("express")
const router =express.Router();
const mongoose = require("mongoose");
require("../model/Usuario");
const Usuario = mongoose.model("usuarios");
require("../model/Objeto");
const Objeto = mongoose.model("objetos");
const bcrypt = require("bcryptjs")
const passport = require("passport")


router.get("/registro", (req, res) => {
  res.render("usuarios/registro")
})

router.post("/registro", (req, res) => {
  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: "Nome inválido!"})
  }
  if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
    erros.push({texto: "E-mail inválido!"})
  }
  if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
    erros.push({texto: "Senha inválida!"})
  }
  if(req.body.senha.length < 4){
    erros.push({texto: "Senha muito curta!"})
  }
  if(req.body.senha != req.body.senha2){
    erros.push({texto: "As senhas são diferentes, tente novamente!"})
  }

  if(erros.length>0){
    res.render("usuarios/registro", {erros: erros})
    // req.flash("")
  }else{
    Usuario.findOne({email: req.body.email}).then((usuario) => {
      if(usuario){
        req.flash("error_msg", "Já existe uma conta com este email!")
        res.redirect("/usuarios/registro")
      }else{
        const novoUsuario = new Usuario({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha
        })

        bcrypt.genSalt(10, (erro, salt) => {
          bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
            if(erro){
              req.flash("error_msg", "Houve um erro durante o resgistro do usuário!")
              res.redirect("/")
            }
            novoUsuario.senha = hash

            novoUsuario.save().then(() => {
              req.flash("success_msg", "Usuário cadastrado com sucesso!")
              res.redirect("/")
            }).catch((err) => {
              req.flash("error_msg", "Houve um erro ao criar o usuário, tente novamente!")
              res.redirect("/usuarios.registro")
            })
          })
        })
      }
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno")
      res.redirect("/")
    })

  }

})

router.get("/login", (req, res) => {
  res.render("usuarios/login")
})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/usuarios/login",
    failureFlash: true    
  })(req, res, next)
})

router.get("/logout", (req, res) => {
  req.logOut()
  req.flash("success_msg", "Deslogado com sucesso!")
  res.redirect("/")
})

router.get("/objetos", (req, res) => {
  // res.render("usuarios/objetos")
  Objeto.find().sort({date: 'desc'}).then((objetos) => {
    res.render("usuarios/objetos", {objetos: objetos})
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao listar os objetos, tente novamente")
    res.redirect("/")
  })
})

router.get('/objetos/add', (req, res) => {
  res.render("usuarios/addobjeto")
})

router.post('/objetos/novo', (req, res) => {
  var erros = []
  if(!req.body.codobjeto || typeof req.body.codobjeto == undefined || req.body.codobjeto == null){
    erros.push({texto: "Código inválido"})
  }
  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: "Nome inválido"})
  }
  if(!req.body.categoria || typeof req.body.categoria == undefined || req.body.categoria == null){
    erros.push({texto: "Categoria inválida"})
  }
  if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null){
    erros.push({texto: "Descrição inválida"})
  }
  if(!req.body.preco || typeof req.body.preco == undefined || req.body.preco == null){
    erros.push({texto: "Preço inválido"})
  }
  if(erros.length>0){
    res.render("usuarios/addobjeto", {erros: erros})
  }else{
    const novoObjeto = new Objeto({
      // idusuario: req.body.idusuario,
      codobjeto: req.body.codobjeto,
      nome: req.body.nome,
      categoria: req.body.categoria,
      descricao: req.body.descricao,
      preco: req.body.preco
    })
      new Objeto(novoObjeto).save().then(() => {
      req.flash("success_msg", "Objeto criado com sucesso")
      res.redirect("/usuarios/objetos")
    }).catch((err) => {
      console.log("err", err);
      
      req.flash("error_msg", "Houve um erro ao salvar o objeto, tente novamente1")
      res.redirect("/usuarios/objetos")
    })
  }
})

router.get("/objeto/edit/:id", (req, res) => {
  Objeto.findOne({_id:req.params.id}).then((obejto) => {
    res.render("usuarios/editobjeto", {objeto: objeto})
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao editar o objeto, tente novamente")
    res.redirect("/usuarios/objetos")
  })
})

router.post('/objetos/edit', (req, res) => {
  var erros = []
  if(!req.body.codobjeto || typeof req.body.codobjeto == undefined || req.body.codobjeto == null){
    erros.push({texto: "Código inválido"})
  }
  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: "Nome inválido"})
  }
  if(!req.body.categoria || typeof req.body.categoria == undefined || req.body.categoria == null){
    erros.push({texto: "Categoria inválida"})
  }
  if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null){
    erros.push({texto: "Descrição inválida"})
  }
  if(!req.body.preco || typeof req.body.preco == undefined || req.body.preco == null){
    erros.push({texto: "Preço inválido"})
  }
  if(erros.length>0){
    res.render("usuarios/addobjeto", {erros: erros})
  }else{
    res.send("Página de categorias")
    res.render("usuarios/addobjeto")
    Objeto.findOne({_id: req.body.id}).then((objeto) => {
      objeto.codobjeto = req.body.codobjeto,
      objeto.nome = req.body.nome,
      objeto.categoria = req.body.categoria,
      objeto.descricao = req.body.descricao,
      objeto.preco = req.body.preco

      objeto.save().then(() => {
        req.flash("success_msg", "Objeto editado com sucesso")
        res.redirect("/usuarios/objetos")
      }).catch((err) => {
        console.log("err", err);

        req.flash("error_msg", "Houve um erro ao salvar a edição do objeto, tente novamente2")
        res.redirect("/usuarios/objetos")
      })
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao editar o objeto, tente novamente")
        res.redirect("/usuarios/objetos")
    })
  }
})

router.post("/objeto/deletar", (req, res) => {
  Objeto.remove({_id: req.body.id}).then(() => {
    req.flash("success_msg", "Objeto deletado com sucesso!")
    res.redirect("/usuarios/objetos")
  }).catch((err) => {
      console.log("err", err);
    req.flash("error_msg", "Houve um erro ao deletar a objeto!")
    res.redirect("/usuarios/objetos")

  })
})











module.exports = router