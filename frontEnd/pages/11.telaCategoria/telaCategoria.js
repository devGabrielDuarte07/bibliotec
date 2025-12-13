const categoria = localStorage.getItem("categoriaSelecionada");

if (!categoria) {
    console.error("Categoria não encontrada no localStorage");

    throw new Error("Categoria não definida");
}
const APILivrosPorCategoria = `http://localhost:3000/livros/categoria/${categoria}`;
const conteiner = document.querySelector(".exibirLivros");
const tituloCategoria = document.getElementById("categoria");
tituloCategoria.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
async function carregarLivrosPorCategoria() {
    try {
        const resposta = await fetch(APILivrosPorCategoria);
        console.log(resposta);
        const dados = await resposta.json();
        if (!resposta.ok) {
            throw new Error(dados.erro || "Erro ao carregar livros por categoria");
        }
        console.log(dados);
        montarLivros(dados);
    } catch (erro) {
        console.error("Erro ao carregar livros por categoria:", erro);
    }
}

function montarLivros(dados) {
    dados.forEach((livro) => {
         const divCard = document.createElement('div')
        divCard.classList.add('cardLivro');

        divCard.innerHTML = `
            <img src="${livro.capa_url}" alt="${livro.titulo}" class="livro" data-descricao="${livro.descricao}" id="livro-${livro.livro_id}">
            <h3 class="nomesLivros">
                ${livro.titulo}
                <img 
                    class="coracaoFav2" 
                    src="../../img/coracaoCheio.png" 
                    id="coracoFav-${livro.livro_id}"
                >
            </h3>`;
        conteiner.appendChild(divCard);
    });
}

carregarLivrosPorCategoria();