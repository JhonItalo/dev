
const mongoose = require("mongoose");
require("../model/UserModel");
const Users = mongoose.model("Users");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


exports.inserir = function(user, senha, nome, sobrenome, idade, rua, numero, bairro, complemento, email, telefone, res)
{
	
	var novouser = new Users({	
		"user": user,
		"senha": senha,
		"nome": nome,
		sobrenome: sobrenome,
		"idade": idade,
		rua: rua,
		"numero": numero,
		bairro: bairro,
		"complemento": complemento,
		email: email, 
		"telefone": telefone
	})
novouser.save().then(()=> 
			{
				console.log(this.login(user, senha, res))}).catch((err) => {
				res.send(err.errmsg);
				})
}	

exports.login = function(user, senha, res)
{
	Users.findOne({"user": user, "senha": senha}).then((data) => 
	{(
			console.log(a))
		if (!data) {
			res.send("Usuario não existe ou senha está incorreta")
			} 
		else {
			 	var a = {
							"id": data._id,
							"user": data.user,
							"nome": data.nome,
							sobrenome: data.sobrenome,
							"idade": data.idade,		
							rua: data.rua,
							"numero": data.numero,
							bairro: data.bairro,
							"complemento": data.complemento,
							email: data.email, 
							"telefone": data.telefone,
							}
							console.log("criado user")
			 		res.send(a);
			 }
	}).catch((err) => {
		res.send(err.errmsg)
	})

}

exports.editar = function(user, senha, nome, sobrenome, idade, rua, numero, bairro, complemento, email, telefone, res)
{
	Users.findOne({"user": user, "senha": senha}).then((data) => 
	{
		
		if (!data) {
			res.send("Usuario nao existe ou senha está incorreta")
			} 
		else {
			 	data.user = user,
				data.nome = nome
				data.sobrenome = sobrenome,
				data.idade = idade,
				data.rua = rua,
				data.numero = numero,
				data.bairro = bairro,
				data.complemento = complemento,
				data.email = email,
				data.telefone = telefone,
				data.save()
				var a = {
						id: data._id,
						user: data.user,
						nome: data.nome,
						sobrenome: data.sobrenome,
						idade: data.idade,
						rua: data.rua,
						numero: data.numero,
						bairro: data.bairro,
						complemento: data.complemento,
						email: data.email,
						telefone: data.telefone,
					}
					console.log("user editado")
					res.send(a)
			 	}
	}).catch((err) => {
		res.send(err.errmsg)
	})

}

exports.visualizar = function(id, res){
	Users.findOne({"_id": id}).then((data) => 
	{
		if (!data) {
			res.send("0")
		 } 
		else {
			var a = {
				"user": data.user,
				"nome": data.nome,
				sobrenome: data.sobrenome,
				"idade": data.idade,		
				rua: data.rua,
				"numero": data.numero,
				bairro: data.bairro,
				"complemento": data.complemento,
				email: data.email, 
				"telefone": data.telefone,
			}
			res.send(a)
		}
	}).catch((err) => {
		res.send(err.errmsg)
	})
}


exports.deletar = function(id, senha, res){
		Users.deleteOne({"_id": id, "senha": senha}).then((data) => 
	{
		if (!data) {
			res.send("0")
		 } 
		else {
			console.log("user deletado")
			res.send("ok")
		}
	}).catch((err) => {
		res.send(err.errmsg)
	})
}

