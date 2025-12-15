
const descricaoLivro2 = document.getElementById('descricaoLivro');
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("livro")) {
        const livroId = e.target.id.split("-")[1];


        descricaoLivro.innerHTML = `
            <h3 class="h3Descricao">One Piece vol-1</h3>
            <div class="descricao">
                <img class="imgDescricao" src="${e.target.src}">
                <p class="pDescricaoLivro">O primeiro volume apresenta Monkey D. Luffy desde sua infância, quando admira Shanks e sua tripulação. Após comer a Gomu Gomu no Mi, ele ganha um corpo elástico, mas perde a capacidade de nadar. Anos depois, já adolescente, decide partir sozinho para os mares, mesmo sem navio ou tripulação, guiado apenas pelo sonho de encontrar o One Piece e se tornar o Rei dos Piratas. Nesse volume, Luffy enfrenta sua primeira inimiga, Alvida, mostrando seu estilo ingênuo, corajoso e otimista. Ele também conhece Roronoa Zoro, um caçador de piratas temido, preso injustamente pela Marinha. Luffy o liberta e tenta convencê-lo a se juntar à sua tripulação. O volume estabelece o espírito de aventura, liberdade e amizade que define toda a série.</p>
            </div>
            <div class="botoes">
                 <button class="editarLivroBotao">Editar livro</button>
                 <button class="excluirLivroBotao">Excluir livro</button>
                </div>
                </div>
        `
        descricaoLivro.classList.add("ativa");

        return;
    }

    if (!descricaoLivro.contains(e.target)) {
        descricaoLivro.classList.remove("ativa");
    }
});

const botaoAdd = document.getElementById('botaoAdd');
const adicionarLivro = document.getElementById('adicionarLivro');

botaoAdd.addEventListener("click", () => {
    adicionarLivro.innerHTML = `
       aa
    `
    adicionarLivro.classList.add("ativa");
});

document.addEventListener("click", (e) => {
    if (!adicionarLivro.contains(e.target) && e.target !== botaoAdd) {
        adicionarLivro.classList.remove("ativa");
    }
});
