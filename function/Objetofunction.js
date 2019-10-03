const mongoose = require("mongoose");
require("../model/ObjetoModel");
const Objetos = mongoose.model("Objetos");
const bcrypt = require("bcryptjs")
require("../model/UserModel");
const Users = mongoose.model("Users");


exports.criar = function(id, nobjeto, nome, categoria, descricao, preco, res)
{

	var novobjeto = new Objetos({	
		nobjeto: nobjeto,
		"nome": nome,
		categoria: categoria,
		descricao: descricao,
		preco: preco,
		dono: id,
	})
	Users.findOne({"_id": id}).then((user) =>
				{
					if(user){novobjeto.save().then((data)=>{
					
						user.produtos.push(data._id)
						user.save()
						res.send(data);
					
					
				}).catch((err)=> {
					res.send(err.errmsg);
				})}
			}).catch((err)=>{
				res.send(err.errmsg);
			})
}
exports.editar = function(id, nobjeto, nome, categoria, descricao, preco, res)
{
	Objetos.findOne({"nobjeto": nobjeto}).then((data) => 
	{
		if (!data) {
			res.send("Objeto não existe")
		} 
		else {
			if(id === data.dono)
			{
				data.nome = nome
				data.categoria = categoria
				data.descricao = descricao
				data.preco = preco
				data.save()
				var a = {
						nobjeto: nobjeto,
						nome: data.nome,
						categoria: data.categoria,
						descricao: data.descricao,
						preco: data.preco
						}
				res.send(a)
			}
				else
				{
					res.send("sem permissão")
				}
			}
	}).catch((err) => {
		res.send(a)
	})

}

exports.deletar = function(id, nobjeto, res)
{
		Objetos.findOne({"nobjeto": nobjeto}).then((data) => 
	{
		if (data) 
		{
			if (id === data.dono)
			 {
				Objetos.deleteOne({"nobjeto": nobjeto}).then(()=>
				{
				console.log("vgff")
				res.send("ok")
				})
			 }	
		} 
		else {
			res.send("objeyto nao encontrado")
				
		}
	}).catch((err) => {
		res.send(err.errmsg)
	})
}

exports.visualizar = function(nobjeto, res){
	Users.findOne({"nobjeto": nobjeto}).then((data) => 
	{
		if (!data) {
			res.send("objeto não existe")
		 } 
		else {
			var a = {
				"nome": data.nome,
				categoria: data.categoria,
				descricao: data.descricao,
				preco: data.preco,		
			
		}
		res.send(a)
	}
	}).catch((err) => {
		res.send(err.errmsg)
	})
}










