require('dotenv').config();
const express = require('express');
const rotas = require('./routes/route');
const { init: templete } = require('./helpers/templeteHandlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Middleware para servir arquivos estáticos (como CSS, JS)
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());

// Inicializa o template engine Handlebars
templete(app);

app.use(express.json());

// Define as rotas da aplicação
app.use(rotas);

app.listen(3000, '0.0.0.0', () => {
    console.log('Server rodando na porta 3000');
});

