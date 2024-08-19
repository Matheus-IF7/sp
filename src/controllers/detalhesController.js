const BookDetails = require('../models/DetalhesModel');
const { fetchBooks } = require('../services/bookApiService');

exports.detalhesController = async (req, res) => {
    const bookId = req.query.id;

    if (!bookId) {
        return res.status(400).send('Por favor, forneça o ID do livro na query string (e.g., ?id=BOOK_ID).');
    }

    try {
        const data = await fetchBooks(bookId, true);

        if (!data || !data.items || data.items.length === 0) {
            return res.status(404).send('Nenhum livro encontrado para o ID fornecido.');
        }

        const bookData = data.items[0].volumeInfo;
        const bookDetails = new BookDetails({
            title: bookData.title,
            authors: bookData.authors,
            price: bookData.saleInfo?.listPrice,
            description: bookData.description,
            publisher: bookData.publisher,
            publishedDate: bookData.publishedDate,
            pageCount: bookData.pageCount,
            categories: bookData.categories,
            averageRating: bookData.averageRating,
            thumbnail: bookData.imageLinks?.thumbnail,
            googleBookId: data.items[0].id,
            previewLink: bookData.previewLink
        });

        return res.render('detalhes', { book: bookDetails });
    } catch (error) {
        console.error('Erro ao processar detalhes do livro:', error.message);
        return res.status(500).send('Erro interno ao buscar detalhes do livro.');
    }
};