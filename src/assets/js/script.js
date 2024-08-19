// Seleciona todas as seções que devem ser animadas
document.addEventListener('DOMContentLoaded', () => {

    const leftSections = document.querySelectorAll('.cApresetacao-esquerda');
    const rightSections = document.querySelectorAll('.cApresetacao-direita');
    const btnFavorito = [...document.querySelectorAll(".btnFavorito")];
    const btnremoverf = [...document.querySelectorAll(".removerf")];
    const form = document.getElementById('form')

    // Função para verificar a rolagem e adicionar/remover classes de animação
    function checkScroll() {

        leftSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight) {
                section.classList.add('aparecer');
            } else {
                section.classList.remove('aparecer');  // 
            }
        });

        rightSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight) {
                section.classList.add('aparecer');
            } else {
                section.classList.remove('aparecer');
            }
        });
    }

    if (form) {
        // Adiciona um event listener para o scroll da janela
        window.addEventListener('scroll', checkScroll);
        checkScroll();
        // Função para scroll suave ao submeter o formulário
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            window.scrollBy({
                top: 550,
                behavior: 'smooth'
            });

            setTimeout(() => {
                this.submit();
            }, 200);
        });

    }



    // Inicialização do Google Books API e configuração do visualizador
    document.addEventListener('DOMContentLoaded', () => {
        google.books.load();

        function initialize() {

            const viewerCanvas = document.getElementById('viewerCanvas');
            if (viewerCanvas) {
                const viewer = new google.books.DefaultViewer(viewerCanvas);
                const bookIdMeta = document.querySelector('meta[name="googleBookId"]');
                const bookId = bookIdMeta ? bookIdMeta.content : null;

                console.log("Google Book ID:", bookId);

                if (bookId) {
                    viewer.load(bookId, () => {

                    }, () => {

                        showAlert('não é possovel ter essa previa do livro!', 'info');
                    });
                } else {
                    console.error('ID do livro não encontrado.');
                }
            } else {
                console.error('Elemento viewerCanvas não encontrado.');
            }
        }

        google.books.setOnLoadCallback(initialize);
    });



    btnFavorito.map((el) => {
        el.addEventListener("click", () => {
            const livroContainer = el.closest('.caixaLivros');
            const title = livroContainer.querySelector('.titulo').textContent;
            const authors = livroContainer.querySelector('.autho').textContent.replace("Autor(es): ", "").split(", ");
            const description = livroContainer.querySelector('.descricao').textContent;
            const imageElement = livroContainer.querySelector('.caixaImg img');
            const imageLinks = imageElement ? imageElement.src : null;

            const livroData = {
                title,
                authors,
                description,
                imageLinks
            };

            showAlert('livro adicionado ao favorito!', 'info');

            fetch('/add-fav', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(livroData)
            })
                .then(response => response.text())
                .then(data => {
                    showAlert('livro adicionado ao favorito!', 'success');
                })
                .catch(error => {
                    console.error('Erro ao adicionar aos favoritos:', error);
                });
        });
    });


    btnremoverf.map((el) => {
        el.addEventListener('click', () => {
            const bookTitle = el.getAttribute('data-title');

            fetch('/remove-item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: bookTitle })
            })
                .then(response => response.text())
                .then(data => {
                    showAlert('livro removido do favorito!', 'success');
                    window.location.reload()
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        });
    });


    // Função para exibir uma mensagem de alerta
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `
        <span>${message}</span>
        <span class="fecharMsg">&times;</span>
    `;

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.classList.add('show');
        }, 10);

        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => {
                alertDiv.remove();
            }, 500);
        }, 3000);
    }



    // Adiciona evento de clique ao botão de fechar da mensagem
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('fecharMsg')) {
            const alertDiv = event.target.closest('.alert');
            if (alertDiv) {
                alertDiv.classList.remove('show');
                setTimeout(() => {
                    alertDiv.remove();
                }, 500);
            }
        }
    });

    // Exibe a mensagem ao carregar a página
    window.onload = function () {
        showAlert('Bem-vindo ao site!', 'info');
    };

});
