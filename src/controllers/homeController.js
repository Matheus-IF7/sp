require("dotenv").config()
const bookApiService = require('../services/bookApiService');

const { BASE_DIR } = require("../helpers/Constantes")

const HomeController = async (req,res) =>{

    try{
        const livrosAnime= await bookApiService.fetchBooks("+subject:anime");
        const livrosRomace= await bookApiService.fetchBooks("+subject:romance");
        const livrosFantasia= await bookApiService.fetchBooks("+subject:fantasia");
        const livrosDrama= await bookApiService.fetchBooks("+subject:drama");
        req.flash('info', 'bem vindo ao site!');
        return res.render('home', 
            {layout:BASE_DIR, 
                title:"home",
                livrosRomace:livrosRomace.items,
                livrosFantasia:livrosFantasia.items,
                livrosAnime:livrosAnime.items,
                livrosDrama:livrosDrama.items,
            }

        )
       
    }catch(erro){
        console.log("erro controller home",erro)
    }
   
    
}


module.exports={
    HomeController
}