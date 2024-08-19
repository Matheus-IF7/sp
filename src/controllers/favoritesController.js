require("dotenv").config()
const { BASE_DIR } = require("../helpers/Constantes.js")
const Cart = require("../models/cartModel.js");
const favoritesController = async (req,res) =>{

    try{
        const cart = new Cart;
        const items = cart.listItems();
        return res.render('favorites', {
            layout:BASE_DIR,
            title: "Minha Lista de Livros favoritos",
            resultadoLista: items,
        });

        
    }catch(erro){
        console.log("Erro controle favorites: ",erro)
    }
   
    
}

module.exports={
    favoritesController
}