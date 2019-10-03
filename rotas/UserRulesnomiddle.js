const express = require("express")
const router2 =express.Router();
const mongoose = require("mongoose");
require("../model/UserModel");
const Users = mongoose.model("Users");
const funcao = require("../function/Userfunction");

router2.post("/inserir", async (req, res) => {
	
funcao.inserir(req.body.user, req.body.senha, req.body.nome, req.body.sobrenome, req.body.idade, req.body.rua, req.body.numero,
	req.body.bairro, req.body.complemento, req.body.email, req.body.telefone, res)

})

router2.post("/login", async (req, res) => {
	funcao.login(req.body.user, req.body.senha, res)
})

module.exports = router2