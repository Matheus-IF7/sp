const LocalStorage = require('node-localstorage').LocalStorage;

// Inicializa o LocalStorage
const localStorage = new LocalStorage('./src/assets/public/scratch');

class Cart {
    constructor() {
        this.loadFromLocal();
    }

    saveToLocal() {
        localStorage.setItem('books', JSON.stringify(this.items));
    }

    loadFromLocal() {
        this.items = JSON.parse(localStorage.getItem('books') || []);
        
    }

    addItem(book) {
        if (this.items != null) {
            const existingItem = this.items.find(item => item.title === book.title);
        if (existingItem) {
            return false;
        } else {
            this.items.push({ ...book, quantity: 1 });
            this.saveToLocal();
            return true;
        }
        
    }
        return false;
        }
        

    removeItem(title) {
        this.loadFromLocal()
        console.log('EXECUTANDO')
        const index = this.items.findIndex(item => item.title === title);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.saveToLocal();
            console.log('Removido com sucesso')
        }
    }

    insertinHTML(){
        return this.removeItem()
    }

    listItems() {
        this.loadFromLocal();
        return this.items;
    }


    clearCart() {
        this.items = [];
        this.saveToLocal();
    }
}

module.exports = Cart
