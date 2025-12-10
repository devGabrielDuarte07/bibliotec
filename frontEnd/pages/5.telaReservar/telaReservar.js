const APILivro = "http://localhost:3000/livros"

const id = window.localStorage.getItem(`id`)
const APIFav = `http://localhost:3000/favoritos/${id}`
const APIDesfavoritar = 'http://localhost:3000/favoritos/desfavoritar'
console.log(id)
const exibirLivros = document.querySelector('.exibirLivros');

async function buscarAlunosFav() {
    try {
        const response = await fetch(APIFav);
        if (!response.ok) {
            throw new Error('Erro na requisição à API');
        }

        const dados = await response.json();
        console.log('Livros recebidos:', dados);
        return dados; // retorna os dados para serem usados depois

    } catch (error) {
        console.error('Erro ao buscar Livros:', error);
        return null;
    }
}

async function carregarLivrosFavoritos() {
    // const livros = await buscarLivros();
    const alunosFav = await buscarAlunosFav();
    const divApenasManga = document.createElement('div')
    divApenasManga.classList.add('apenasMangas');

    alunosFav.forEach(livro => {
        const divCard = document.createElement('div')
        divCard.classList.add('cardLivro');

        divCard.innerHTML = `
            <img src="${livro.capa_url}" alt="${livro.titulo}" class="livro" data-descricao="${livro.descricao}">
            <h3 class="nomesLivros">
                ${livro.titulo}
                <img 
                    class="coracaoFav2" 
                    src="../../img/coracaoCheio.png" 
                    id="coracoFav-${livro.livro_id}"
                >
            </h2>`;

        exibirLivros.appendChild(divCard)


    })
    divApenasManga.appendChild(divCard)
    exibirLivros.appendChild(divApenasManga)
}

carregarLivrosFavoritos();

document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("coracaoFav2")) return;

    const idCoracao = e.target.id;
    const livroId = idCoracao.split("-")[1];

    try {
        const requisicao = await fetch(APIDesfavoritar, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                aluno_id: id,
                livro_id: livroId
            })
        });

        if (!requisicao.ok) {
            alert("Erro no servidor. Código: " + requisicao.status);
            return;
        }

        window.location.reload()

    } catch (error) {
        console.error(error);
        alert("Erro de conexão com servidor.");
    }
});

const descricaoLivro2 = document.getElementById('descricaoLivro');
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("livro")) {
        descricaoLivro.innerHTML = `
            <h3 class="h3Descricao">${e.target.alt}</h3>
            <div class="descricao">
                <img class="imgDescricao" src="${e.target.src}">
                <p class="pDescricaoLivro">${e.target.dataset.descricao}</p>
            </div>
        `;
        descricaoLivro.classList.add("ativa");
        return;
    }

    // Se clicar fora → fecha
    if (!descricaoLivro.contains(e.target)) {
        descricaoLivro.classList.remove("ativa");
    }
});
