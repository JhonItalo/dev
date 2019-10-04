const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Objeto = new schema({
  idusuario: {
		type: String,
		required: true, 
	},
  codobjeto: {
		type: String,
		required: true
  },
  nome: {
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
		default: 0
	},
	date: {
		type: Date,
		default: Date.now()
	}
})

mongoose.model("objetos", Objeto)