const descricaoLivro = document.getElementById('descricaoLivro');
const livros = document.querySelectorAll('.livro');

// Abrir ao clicar no livro
livros.forEach(livro => {
    livro.addEventListener('click', (e) => {
        e.stopPropagation();
        descricaoLivro.innerHTML = `
            <h3 class="h3Descricao">${livro.alt}</h3>
            <div class="descricao">
            <img class="imgDescricao" src="${livro.src}">
            <p class="pDescricaoLivro">aa</p>
            <div>
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


