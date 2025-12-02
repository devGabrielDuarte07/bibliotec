    const descricaoLivro = document.getElementById('descricaoLivro');
    const descricaoFiltro = document.getElementById('descricaoFiltro')
    const livros = document.querySelectorAll('.livro');

    // Abrir ao clicar no livro
    livros.forEach(livro => {
        livro.addEventListener('click', (e) => {
            e.stopPropagation();
            const valor = livro.getAttribute("data-descricao")
            descricaoLivro.innerHTML = `
                <h3 class="h3Descricao">${livro.alt}</h3>
                <div class="descricao">
                <img class="imgDescricao" src="${livro.src}">
                <p class="pDescricaoLivro">${valor}</p>
                <div>
            `;
            descricaoLivro.classList.add('ativa');
            descricaoFiltro.style.display = 'flex'
        });
    });

    // Fechar quando tirar o mouse
    descricaoLivro.addEventListener('mouseleave',  () => {
        descricaoLivro.classList.remove('ativa');
        descricaoFiltro.style.display = 'none'
    });

    descricaoLivro.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("click", () => {
        descricaoFiltro.style.display = 'none'
        descricaoLivro.classList.remove("ativa");
        
    });





    
