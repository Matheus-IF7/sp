class BookDetails {
    constructor({ title, authors, price, description, publisher, publishedDate, pageCount, categories, averageRating, thumbnail, previewLink, googleBookId }) {
        this.title = title || 'Título não disponível';
        this.authors = authors ? authors.join(', ') : 'Autor(es) não disponível(is)';
        this.price = price ? `${price.amount} ${price.currencyCode}` : 'Preço não disponível';
        this.description = description || 'Descrição não disponível';
        this.publisher = publisher || 'Editora não disponível';
        this.publishedDate = publishedDate || 'Data de publicação não disponível';
        this.pageCount = pageCount || 'Número de páginas não disponível';
        this.categories = categories ? categories.join(', ') : 'Categorias não disponíveis';
        this.averageRating = averageRating || 'Avaliação não disponível';
        this.thumbnail = thumbnail || 'Imagem não disponível';
        this.previewLink = previewLink || '#';
        this.googleBookId = googleBookId || null;
    }
}

module.exports = BookDetails;