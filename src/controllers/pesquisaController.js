const bookApiService = require('../services/bookApiService');

const PesquisaController = async (req, res) => {
    try {
        const search = req.query.search;
        if (search) {
            const resultadoBusca = await bookApiService.fetchBooks(search);
            return res.render('home', {
                title: "Resultados da Pesquisa",
                resultadoBusca: resultadoBusca.items || [],
                search: search
            });
        } else {
            return res.redirect('/');
        }
    } catch (erro) {
        console.error("Erro no controller de pesquisa:", erro);
        res.status(500).send("Erro no servidor");
    }
};

module.exports = {
    PesquisaController
};
