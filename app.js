//carregando modulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const app = express();
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
require("./config/auth")(passport)

//configurações
	//Sessão
	app.use(session({
		secret: "teste",
		resave: true,
		saveUninitialized: true
	}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(flash())
	// Middleware
	app.use((req, res, next) => {
		res.locals.success_msg = req.flash("success_msg")
		res.locals.error_msg = req.flash("error_msg")
		res.locals.error = req.flash("error")
		res.locals.user = req.user || null;
		next()
	})
	//body Parser
	// app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json())
	//Handlebars
	app.engine('handlebars', handlebars({defaultLayot: 'main'}))
	app.set('view engine', 'handlebars')
	//Mongoose
	mongoose.Promise = global.Promise;
	mongoose.connect("mongodb://localhost/plataforma", {useNewUrlParser: true}).then(() => {
		console.log("Conectado ao mongodb");
	}).catch((err) => {
		console.log("Erro ao conectar no mongodb" + err);
	});
	mongoose.set('useCreateIndex', true)
	//Public
	app.use(express.static(path.join(__dirname, "public")))


//rotas
app.get("/", (req, res) => {
  res.render("index")
})

const Usuarios = require("./rotas/Usuarios");
app.use("/usuarios", Usuarios);

// const Objetos = require("./rotas/Objetos")
// app.use("/objetos", Objetos);


// const admin = require("./rotas/admin")
// app.use("/admin", admin);

// const UserRulesnomiddle = require("./rotas/UserRulesnomiddle")
// app.use("/usuario", UserRulesnomiddle)

// const ObjetoRules = require("./rotas/ObjetoRules")
// app.use("/usuario", ObjetoRules);



//outros
const PORT = 8081;
app.listen(PORT, () => {
	console.log("Servidor ativo");
})