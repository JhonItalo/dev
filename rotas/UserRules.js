const express = require("express")
const router =express.Router();
const mongoose = require("mongoose");
require("../model/UserModel");
const Users = mongoose.model("Users");
const funcao = require("../function/Userfunction");


router.post("/deletar",  (req, res) => {
	funcao.deletar(req.body.id, req.body.senha, res)	
})

router.get("/visualizar/:id", (req, res) => {
	funcao.visualizar(req.params.id, res)
})

router.post("/editar", (req, res) => 
{
	funcao.editar(req.body.user, req.body.senha, req.body.nome, req.body.sobrenome, req.body.idade, req.body.rua, req.body.numero,
	req.body.bairro, req.body.complemento, req.body.email, req.body.telefone, res)
	
})

module.exports = router