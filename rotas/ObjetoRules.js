const express = require("express")
const router =express.Router();
const mongoose = require("mongoose");
require("../model/ObjetoModel");
const Objetos = mongoose.model("Objetos");
const funcao = require("../function/Objetofunction");
const jwt = require('jsonwebtoken');

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