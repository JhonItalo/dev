const mongoose = require("mongoose");
const schema = mongoose.Schema;

const User = new schema({

	"user": {
		type: String,
		required: true,
		unique: true
	},
	"senha": {
		type: String,
		required: true, 
	},
	"nome": {
		type: String,
		required: true
	},
	sobrenome: {
		type: String,
		required: true
	}, 
	"idade": {
		type: Number,
		required: true,
	}, 
	rua: {
			type: String,
			required: true
		 },
	bairro: {
			type: String,
			required: true
			 },
	"complemento": {
				type: String,
				required: false
				 },
	"numero": {
				type: String,
				required: true 
				},
	email: {
		type: String,
		required: true
	},

	"telefone": {
		type: String,
		required: true
	},

	date: {
		type: Date,
		default: Date.now()
	},

	"produtos": {
		type: Array
	} 
})

mongoose.model("Users", User)