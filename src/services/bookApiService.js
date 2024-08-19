const config = require('../config/config');

// Função para buscar livros com termos de pesquisa
const fetchBooks = async (searchTerms, apiKey = false) => {
  try {
    if (typeof searchTerms !== 'string') {
      throw new Error('searchTerms deve ser uma string válida');
    }

    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerms)}`;

    if (apiKey && config.googleBooksApiKey) {
      url += `&key=${config.googleBooksApiKey}`;
    }

    const response = await fetch(url); 
    const data = await response.json(); 
    return data;
    
  } catch (error) {
    console.error('Erro ao buscar livros:', error.message);
  }
};

// Função para buscar livro por ID
const fetchBookById = async (bookId, apiKey = false) => {
  try {
    if (typeof bookId !== 'string') {
      throw new Error('bookId deve ser uma string válida');
    }

    let url = `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(bookId)}`;

    if (apiKey && config.googleBooksApiKey) {
      url += `?key=${config.googleBooksApiKey}`;
    }

    const response = await fetch(url); 
    const data = await response.json(); 
    return data;
    
  } catch (error) {
    console.error('Erro ao buscar livro por ID:', error.message);
  }
};

module.exports = {
  fetchBooks,
  fetchBookById,
};