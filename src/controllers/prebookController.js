const PreBook = require('../models/preBookModel');

exports.prebookController = (req, res) => {
    const preBookData = PreBook.fromRequest(req);

    if (!preBookData.googleBookId) {
        return res.status(400).send('ID do livro não fornecido.');
    }

    return res.render('preBook', {
        preBook: preBookData,
        title: 'Pré-visualização do Livro'
    });
};