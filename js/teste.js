const APILivros = "http://localhost:3000/livros"
const campoPesquisa = document.querySelector('.inputCampo');
const conteiner = document.querySelector('.conteiner')
const descricaoLivro = document.getElementById('descricaoLivro');
const APIFavoritar = `http://localhost:3000/favoritos/favoritar`;
const APIDesfavoritar = "http://localhost:3000/favoritos/desfavoritar";
const idAluno = localStorage.getItem("id");
const APIListFavoritos = `http://localhost:3000/favoritos/${idAluno}`;


async function buscarDadosDoBanco() {
    try {
        const response = await fetch(APILivros);
        if (!response.ok) {
            throw new Error('Erro na requisição à API');
        }

        const dados = await response.json();
        console.log('Dados recebidos:', dados);
        return dados; // retorna os dados para serem usados depois

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}

function montarCategoria(titulo, genero, dados, favoritos) {

    // --- H1 ---
    const h1 = document.createElement("h1");
    h1.id = `h1${titulo}`;
    h1.textContent = titulo;

    // --- Containers principais ---
    const fadeUp = document.createElement("div");
    fadeUp.classList.add("fade-up");

    const exibir = document.createElement("div");
    exibir.classList.add("exibirLivros", titulo);

    const apenasLivros = document.createElement("div");
    apenasLivros.classList.add("apenasLivros");

    exibir.appendChild(apenasLivros);

    // --- Controls ---
    const controls = document.createElement("div");
    controls.classList.add(`controls${titulo}`);

    controls.innerHTML = `
        <span class="arrow right material-icons arrow-right" id="setas${titulo}">keyboard_arrow_right</span>
        <span class="arrow left material-icons arrow-left" id="setas${titulo}">keyboard_arrow_left</span>
    `;

    fadeUp.appendChild(exibir);
    fadeUp.appendChild(controls);

    // --- Adiciona tudo no container principal ---
    conteiner.appendChild(h1);
    conteiner.appendChild(fadeUp);

    // --- Criar os cards dessa categoria ---
    dados.forEach(livro => {
        if (livro.genero !== genero) return;

        const card = document.createElement("div");
        card.classList.add("cardLivro");
        card.setAttribute("data-titulo", livro.titulo);

        const jaFavoritado = favoritos.some(f => f.livro_id === livro.id);

        card.innerHTML = `
            <img src="${livro.capa_url}" alt="${livro.titulo}" class="livro">
            <h2 class="nomesLivros">
                ${livro.titulo}
                <img 
                    class="coracao ${jaFavoritado ? "favoritado" : ""}" 
                    src="${jaFavoritado ? 'img/coracaoCheio.png' : 'img/coracaoVazio.png'}" 
                    id="coracoFav-${livro.id}"
                >
            </h2>
        `;

        apenasLivros.appendChild(card);
        apenasLivros.appendChild(document.createElement("br"));

    });
}

async function carregarLivros() {
    const dados = await buscarDadosDoBanco();
    const favoritosResponse = await fetch(APIListFavoritos);
    const favoritos = await favoritosResponse.json();

    montarCategoria("Mangas", "manga", dados, favoritos);
    montarCategoria("Romance", "romance", dados, favoritos);
    montarCategoria("Suspense", "suspense", dados, favoritos);
    montarCategoria("Terror", "terror", dados, favoritos);

}

carregarLivros();


document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("coracao")) return;

    const idCoracao = e.target.id;
    const livroId = idCoracao.split("-")[1];
    const jaFavoritado = e.target.classList.contains("favoritado");

    const url = jaFavoritado ? APIDesfavoritar : APIFavoritar;
    const metodo = jaFavoritado ? "DELETE" : "POST";

    try {
        const requisicao = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                aluno_id: idAluno,
                livro_id: livroId
            })
        });

        if (!requisicao.ok) {
            alert("Erro no servidor. Código: " + requisicao.status);
            return;
        }

        if (metodo === "POST") {
            e.target.src = "img/coracaoCheio.png";
            e.target.classList.add("favoritado");
        } else {
            e.target.src = "img/coracaoVazio.png";
            e.target.classList.remove("favoritado");
        }

    } catch (error) {
        console.error(error);
        alert("Erro de conexão com servidor.");
    }
});

// carousel 
const nextBtn = document.getElementById(`arrow-right`)
const previousBtn = document.getElementById(`arrow-left`)
let deslocamento = 0;
const passo = 400;
const limiteMax = -1600;


nextBtn.addEventListener(`click`, () => {
    deslocamento -= passo;

    if (deslocamento < limiteMax) {
        deslocamento = 0; // volta ao início
    }
    exibirLivros.style.transform = `translateX(${deslocamento}px)`;
})

previousBtn.addEventListener('click', () => {

    deslocamento += passo;
    if (deslocamento > 0) {
        deslocamento = limiteMax; // vai pro final
    }
    exibirLivros.style.transform = `translateX(${deslocamento}px)`;
})


const trilho = document.getElementById('trilho')
const body = document.querySelector('body')
trilho.addEventListener('click', () => {
    trilho.classList.toggle('dark')
    body.classList.toggle('dark')
})

