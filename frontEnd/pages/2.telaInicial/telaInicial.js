const APILivros = "http://localhost:3000/livros"
const campoPesquisa = document.querySelector('.inputCampo');

const descricaoLivro = document.getElementById('descricaoLivro');
const APIFavoritar = `http://localhost:3000/favoritos/favoritar`;
const APIDesfavoritar = "http://localhost:3000/favoritos/desfavoritar";
const idAluno = localStorage.getItem("id");
const APIListFavoritos = `http://localhost:3000/favoritos/${idAluno}`;
const aluno = JSON.parse(localStorage.getItem("aluno"));


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

function montarCategoria(titulo, genero, dados, favoritos, conteiner) {

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
        <span class="arrow right material-icons arrow-right" id="arrow-right-${titulo}">keyboard_arrow_right</span>
        <span class="arrow left material-icons arrow-left" id="arrow-left-${titulo}">keyboard_arrow_left</span>
    `;
    exibir.id = `carrossel-${titulo}`;
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
            <img src="${livro.capa_url}" alt="${livro.titulo}" class="livro" data-descricao="${livro.descricao}">
            <h2 class="nomesLivros">
                ${livro.titulo}
                <img 
                    class="coracao ${jaFavoritado ? "favoritado" : ""}" 
                    src="${jaFavoritado ? '../../img/coracaoCheio.png' : '../../img/coracaoVazio.png'}" 
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
    const conteiner = document.querySelector(".conteiner");

    
    montarCategoria("Populares", "populares", dados, favoritos, conteiner);
    montarCategoria("Mangas", "manga", dados, favoritos, conteiner);
    montarCategoria("Romance", "romance", dados, favoritos, conteiner);
    montarCategoria("Suspense", "suspense", dados, favoritos, conteiner);
    montarCategoria("Terror", "terror", dados, favoritos, conteiner);
}

function configurarCarrossel(titulo) {
    const nextBtn = document.getElementById(`arrow-right-${titulo}`);
    const prevBtn = document.getElementById(`arrow-left-${titulo}`);
    const carrossel = document.querySelector(`#carrossel-${titulo} .apenasLivros`);

    let deslocamento = 0;
    const passo = 400;
    const limiteMax = -1600;

    nextBtn.addEventListener("click", () => {
        deslocamento -= passo;
        if (deslocamento < limiteMax) deslocamento = 0;
        carrossel.style.transform = `translateX(${deslocamento}px)`;
    });

    prevBtn.addEventListener("click", () => {
        deslocamento += passo;
        if (deslocamento > 0) deslocamento = limiteMax;
        carrossel.style.transform = `translateX(${deslocamento}px)`;
    });
}

document.addEventListener("cabecalho-carregado", () => {

    const conteiner = document.querySelector(".conteiner");

    carregarLivros().then(() => {
        configurarCarrossel("Populares");
        configurarCarrossel("Mangas");
        configurarCarrossel("Romance");
        configurarCarrossel("Suspense");
        configurarCarrossel("Terror");
    });

});
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
            e.target.src = "../../img/coracaoCheio.png";
            e.target.classList.add("favoritado");
        } else {
            e.target.src = "../../img/coracaoVazio.png";
            e.target.classList.remove("favoritado");
        }

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
                <div class="final">
                <div class="estrelas">
                <img class="estrelaVazia" src="../../../frontEnd/img/estrelaVazia.png" alt="Estrela vazia">
                <img class="estrelaVazia" src="../../../frontEnd/img/estrelaVazia.png" alt="Estrela vazia">
                <img class="estrelaVazia" src="../../../frontEnd/img/estrelaVazia.png" alt="Estrela vazia">
                <img class="estrelaVazia" src="../../../frontEnd/img/estrelaVazia.png" alt="Estrela vazia">
                <img class="estrelaVazia" src="../../../frontEnd/img/estrelaVazia.png" alt="Estrela vazia">
                </div>
                <div class="osdois">
                <button type="button" class="botaoReservar">Reservar livro</button>
                <img class="coracao" src="../../img/coracaoVazio.png" alt="">
                </div>
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
// Abrir ao clicar no livro
// livros.forEach(livro => {
//     livro.addEventListener('click', (e) => {
//         e.stopPropagation();
//         const valor = livro.getAttribute("data-descricao")
//         descricaoLivro2.innerHTML = `
//             <h3 class="h3Descricao">${livro.alt}</h3>
//             <div class="descricao">
//             <img class="imgDescricao" src="${livro.src}">
//             <p class="pDescricaoLivro">${valor}</p>
//             <div>
//         `;
//         descricaoLivro2.classList.add('ativa');
//     });
// });

// POP UP




// carousel 






