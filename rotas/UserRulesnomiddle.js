const express = require("express")
const router2 =express.Router();
const mongoose = require("mongoose");
require("../model/UserModel");
const Users = mongoose.model("Users");
const funcao = require("../function/Userfunction");

router2.get("/registro", (req, res) => {
	res.render("usuarios/registro")
})

router2.post("/registro", async (req, res) => {

	var erros = []

	if(!req.body.user || typeof req.body.user == undefined || req.body.user == null){
		erros.push({texto: "User inválido"})
	}
	if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
		erros.push({texto: "Senha inválida"})
	}
	if(req.body.senha.length < 4){
		erros.push({texto: "Senha muito curta"})
	}
	if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
		erros.push({texto: "Nome inválido"})
	}
	if(!req.body.sobrenome || typeof req.body.sobrenome == undefined || req.body.sobrenome == null){
		erros.push({texto: "Sobrenome inválido"})
	}
	if(!req.body.idade || typeof req.body.idade == undefined || req.body.idade == null){
		erros.push({texto: "Idade inválida"})
	}
	if(!req.body.rua || typeof req.body.rua == undefined || req.body.rua == null){
		erros.push({texto: "Rua inválida"})
	}
	if(!req.body.numero || typeof req.body.numero == undefined || req.body.numero == null){
		erros.push({texto: "Número inválido"})
	}
	if(!req.body.bairro || typeof req.body.bairro == undefined || req.body.bairro == null){
		erros.push({texto: "Bairro inválido"})
	}
	if(!req.body.complemento || typeof req.body.complemento == undefined || req.body.complemento == null){
		erros.push({texto: "Complemento inválido"})
	}
	if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
		erros.push({texto: "E-mail inválido"})
	}
	if(!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null || req.body.telefone.length<8){
		erros.push({texto: "Telefone inválido"})
	}

	if(erros.length>0){
		res.render("usuarios/registro", {erros: erros})
	}else{
		funcao.inserir(req.body.user, req.body.senha, req.body.nome, req.body.sobrenome, req.body.idade, req.body.rua, req.body.numero, req.body.bairro, req.body.complemento, req.body.email, req.body.telefone, res)
	}
	
})

router2.get("/login", (req, res) => {
	res.render("usuarios/login")
})

router2.post("/login", async (req, res) => {
	funcao.login(req.body.user, req.body.senha, res)
	res.render("usuarios/registro", {erros: erros})
})

module.exports = router2