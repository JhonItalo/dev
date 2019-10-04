const express = require("express")
const router =express.Router();
const mongoose = require("mongoose");
require("../model/ObjetoModel");
const Objetos = mongoose.model("Objetos");
const funcao = require("../function/Objetofunction");
const jwt = require('jsonwebtoken');

router.get('/objetos', (req, res) => {
  // res.send("Página de categorias")
  Categoria.find().sort({date: 'desc'}).then((objetos) => {
    res.render("objeto/objetos", {objetos: objetos})
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao listar os objetos.")
    res.redirect("/usuario")
  })
})

router.get('/objetos/add', (req, res) => {
  // res.send("Página de categorias")
  res.render("objeto/addobjeto")
})

router.post('/objeetos/novo', (req, res) => {

  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: "Nome imvalido"})
  }

  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    erros.push({texto: "Slug imvalido"})
  }

  if(erros.length>0){
    res.render("objeto/addobjeto", {erros: erros})
  }else{
    // res.send("Página de categorias")
		// res.render("admin/addcategoria")
		funcao.criar(req.body.id, req.body.nobjeto, req.body.nome, req.body.categoria, req.body.descricao, req.body.preco, res)

  }
})


router.post("/criar", (req, res) => {
	funcao.criar(req.body.id, req.body.nobjeto, req.body.nome, req.body.categoria, req.body.descricao, req.body.preco, res)
})

router.post("/editar", (req, res)=>{
	funcao.editar(req.body.id, req.body.nobjeto, req.body.nome, req.body.categoria, req.body.descricao, req.body.preco, res)
})

router.post("/deletar", (req, res)=> {
	funcao.deletar(req.body.id, req.body.nobjeto,  res)
})

router.get("/visualizar/:nobjeto", (req, res)=> {
	funcao.deletar(req.paramers.nobjeto, res)
})

module.exports = router