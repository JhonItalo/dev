const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Objeto = new schema({

	nobjeto: {
		type: String,
		required: true
	},
	"nome": {
		type: String,
		required: true
	},
	categoria: {
		type: String,
		required: true
	}, 
	descricao: {
		type: String,
		required: true,
	}, 

	preco: {
		type: Number,
		required: true
	},

	dono: {
		type: String,
		required: true
	},

	date: {
		type: Date,
		default: Date.now()
	},
	
})

mongoose.model("Objetos", Objeto)