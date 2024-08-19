const express = require('express');
const Home = require('../controllers/homeController');
const { PesquisaController } = require('../controllers/pesquisaController'); 
const Favorites = require('../controllers/favoritesController');
const Detalhes = require('../controllers/detalhesController');
const { prebookController } = require('../controllers/prebookController'); 
const Favoritar = require("../controllers/favoritarController");

const rotas = express.Router();

rotas.get('/', Home.HomeController);
rotas.get('/pesquisa', PesquisaController);
rotas.get('/favorites', Favorites.favoritesController);
rotas.get('/detalhes', Detalhes.detalhesController);
rotas.get('/prebook.html', prebookController);
rotas.post('/favorites/add', Favoritar.addFavorito);
rotas.post('/add-fav', Favoritar.addFav);  // Corrigido para '/add-fav'
rotas.post('/remove-item', Favoritar.removerItem);

module.exports = rotas;
