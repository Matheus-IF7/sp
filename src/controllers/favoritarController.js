const cart = require('../models/cartModel');
const Cart = new cart();

// Função para adicionar aos favoritos
const addFavorito = (req, res) => {
    const book = req.body;

    const added = Cart.addItem(book);
    if (added) {
        res.status(200).json({ message: 'Livro adicionado aos favoritos!' });
    } else {
        res.status(400).json({ message: 'Livro já está nos favoritos!' });
    }
};

// Função para remover item do carrinho
const removerItem = (req, res) => {
    const title = req.body;

    if (title && title.title) {
        Cart.removeItem(title.title);
        res.status(200).send('Item removido com sucesso.');
    } else {
        res.status(400).send('Erro: Title Undefined.');
    }
};

// Função para adicionar aos favoritos com redirecionamento
const addFav = (req, res) => {
    const { title, authors, description, imageLinks } = req.body;

    if (title && authors && description) {
        let registro = Cart.addItem({ title, authors, description, imageLinks });
        if (registro === false) {
         
            res.status(200).json({ message: 'Livro já foi adicionado aos favoritos!' });
        } else {
          
            res.status(200).json({ message: 'Livro  adicionado aos favoritos!' });
        }
       
    } else {
        
        res.status(200).json({ message: 'erro! ao  adicionado aos favoritos!' });
    
    }
};

module.exports = {
    addFavorito,
    removerItem,
    addFav
};
