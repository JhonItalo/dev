const express = require("express")
const router =express.Router();

const mongoose = require("mongoose");
require("../model/CategoriaModel");
const Categoria = mongoose.model("Categorias");
// const funcao = require("../function/Objetofunction");
const {eAdmin} = require("../helpers/eAdmin")

router.get('/categorias', (req, res) => {
  // res.send("Página de categorias")
  Categoria.find().sort({date: 'desc'}).then((categorias) => {
    res.render("admin/categorias", {categorias: categorias})
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao listar a categoria, tente novamente")
    res.redirect("/admin")
  })
})

router.get('/categorias/add', (req, res) => {
  // res.send("Página de categorias")
  res.render("admin/addcategoria")
})

router.post('/categorias/nova', (req, res) => {

  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: "Nome imvalido"})
  }

  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    erros.push({texto: "Slug imvalido"})
  }

  if(erros.length>0){
    res.render("admin/addcategoria", {erros: erros})
  }else{
    // res.send("Página de categorias")
    // res.render("admin/addcategoria")
    const novaCategoria = {
      nome:req.body.nome,
      slug:req.body.slug
    }
  
    new Categoria(novaCategoria).save().then(() => {
      // console.log("Categoria salva com sucesso");
      req.flash("success_msg", "Categoria criada com sucesso")
      res.redirect("/admin/categorias")
    }).catch((err) => {
      // console.log("Erro ao salvar categoria");
      req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente")
      res.redirect("/admin")
    })
  }
})

router.get("/categoria/edit/:id", (req, res) => {
  // res.send("Página de ediçãod e categoria")
  Categoria.findOne({_id:req.params.id}).then((categoria) => {
    res.render("admin/editcategoria", {categoria: categoria})
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao editar a categoria, tente novamente")
    res.redirect("/admin/categorias")
  })
})

router.post('/categorias/edit', (req, res) => {

  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: "Nome imvalido"})
  }

  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    erros.push({texto: "Slug imvalido"})
  }

  if(erros.length>0){
    res.render("admin/editcategoria", {erros: erros})
  }else{
    res.send("Página de categorias")
    res.render("admin/addcategoria")
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
      categoria.nome = req.body.nome
      categoria.slug = req.body.slug

      categoria.save().then(() => {
        // console.log("Categoria salva com sucesso");
        req.flash("success_msg", "Categoria editada com sucesso")
        res.redirect("/admin/categorias")
      }).catch((err) => {
        // console.log("Erro ao salvar categoria");
        req.flash("error_msg", "Houve um erro ao salvar a edição da categoria, tente novamente")
        res.redirect("/admin/categorias")
      })


    }).catch((err) => {
      // console.log("err", err);
      
      req.flash("error_msg", "Houve um erro ao editar a categoria, tente novamente")
      res.redirect("/admin/categorias")
    })

  }
})

router.post("/categoria/deletar", (req, res) => {
  Categoria.remove({_id: req.body.id}).then(() => {
    req.flash("success_msg", "categoria deletada com sucesso")
    res.redirect("/admin/categorias")
  }).catch((err) => {
      console.log("err", err);

    req.flash("error_msg", "Houve um erro ao deletar a categoria")
    res.redirect("/admin/categorias")
  })
})





router.get('/teste', (req, res) => {
  res.send("Isso é um teste")
})

module.exports = router
