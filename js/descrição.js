const descricaoLivro = document.getElementById('descricaoLivro');
const livros = document.querySelectorAll('.livro');

// Abrir ao clicar no livro
livros.forEach(livro => {
    livro.addEventListener('click', (e) => {
        e.stopPropagation();
        descricaoLivro.innerHTML = `
            <img src="${livro.src}" style="width:300px; border-radius:10px;">
            <h3>${livro.alt}</h3> 
            <p>Descrição sobre o livro...</p>
        `;
        descricaoLivro.classList.add('ativa');
    });
});

// Fechar quando tirar o mouse
descricaoLivro.addEventListener('mouseleave',  () => {
    descricaoLivro.classList.remove('ativa');
});

descricaoLivro.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", () => {
    descricaoLivro.classList.remove("ativa");
});


const filtro = document.getElementById('filtro')
const popUpFiltro = document.getElementById('pop-up-filtro')
const filtroPop = document.getElementById('filtro-pop')

filtro.addEventListener('click', () => {

    popUpFiltro.classList.add('show');
})

popUpFiltro.addEventListener('click', (evento) => {
    if (evento.target === popUpFiltro) {
        popUpFiltro.classList.remove('show');
    }
})


