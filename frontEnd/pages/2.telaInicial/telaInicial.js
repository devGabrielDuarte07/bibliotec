const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

const APILivros = "http://localhost:3000/livros"
const campoPesquisa = document.querySelector('.inputCampo');
const conteiner = document.querySelector('.conteiner')
const descricaoLivro = document.getElementById('descricaoLivro');
const APIFavoritar = `http://localhost:3000/favoritos/favoritar`;
const APIReservar = `http://localhost:3000/reserva/reservar`;

const APIDesreservar = `http://localhost:3000/reserva/desreservar`

const APIDesfavoritar = "http://localhost:3000/favoritos/desfavoritar";
const idAluno = localStorage.getItem("id");
const APIListFavoritos = `http://localhost:3000/favoritos/${idAluno}`;

const APIListReservados = `http://localhost:3000/reserva/${idAluno}`;
const aluno = JSON.parse(localStorage.getItem("aluno"));
divNomePessoa.textContent = aluno.nome;

async function buscarDadosDoBanco() {
    try {
        const response = await fetch(APILivros);
        if (!response.ok) {
            throw new Error('Erro na requisição à API');
        }

        const dados = await response.json();
        console.log('Dados recebidos:', dados);
        return dados;

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        Toast.fire({ icon: "error", title: "Erro ao carregar livros!" });
        return null;
    }
}

function montarCategoria(titulo, genero, dados, favoritos) {

    const h1 = document.createElement("h1");
    h1.id = `h1${titulo}`;
    h1.textContent = titulo;

    const fadeUp = document.createElement("div");
    fadeUp.classList.add("fade-up");

    const exibir = document.createElement("div");
    exibir.classList.add("exibirLivros", titulo);

    const apenasLivros = document.createElement("div");
    apenasLivros.classList.add("apenasLivros");

    exibir.appendChild(apenasLivros);

    const controls = document.createElement("div");
    controls.classList.add(`controls${titulo}`);

    controls.innerHTML = `
        <span class="arrow right material-icons arrow-right" id="arrow-right-${titulo}">keyboard_arrow_right</span>
        <span class="arrow left material-icons arrow-left" id="arrow-left-${titulo}">keyboard_arrow_left</span>
    `;
    exibir.id = `carrossel-${titulo}`;
    fadeUp.appendChild(exibir);
    fadeUp.appendChild(controls);

    conteiner.appendChild(h1);
    conteiner.appendChild(fadeUp);

    dados.forEach(livro => {
        if (livro.genero !== genero) return;

        const card = document.createElement("div");
        card.classList.add("cardLivro");
        card.setAttribute("data-titulo", livro.titulo);

        const jaFavoritado = favoritos.some(f => f.livro_id === livro.id);

        card.innerHTML = `
            <img src="${livro.capa_url}" alt="${livro.titulo}" class="livro" data-descricao="${livro.descricao}" id="livro-${livro.id}">
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

    montarCategoria("Mangas", "manga", dados, favoritos);
    montarCategoria("Romance", "romance", dados, favoritos);
    montarCategoria("Suspense", "suspense", dados, favoritos);
    montarCategoria("Terror", "terror", dados, favoritos);
}

function configurarCarrossel(titulo) {
    const nextBtn = document.getElementById(`arrow-right-${titulo}`);
    const prevBtn = document.getElementById(`arrow-left-${titulo}`);
    const carrossel = document.querySelector(`#carrossel-${titulo} .apenasLivros`);

    let deslocamento = 0;
    const passo = 460;
    const limiteMax = -2000;

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

carregarLivros().then(() => {
    configurarCarrossel("Mangas");
    configurarCarrossel("Romance");
    configurarCarrossel("Suspense");
    configurarCarrossel("Terror");
});

// FAVORITAR
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
            Toast.fire({ icon: "error", title: "Erro no servidor!" });
            return;
        }

        if (metodo === "POST") {
            e.target.src = "../../img/coracaoCheio.png";
            e.target.classList.add("favoritado");
            Toast.fire({ icon: "success", title: "Livro favoritado!" });

        } else {
            e.target.src = "../../img/coracaoVazio.png";
            e.target.classList.remove("favoritado");
            Toast.fire({ icon: "success", title: "Livro desfavoritado!" });
        }

    } catch (error) {
        console.error(error);
        Toast.fire({ icon: "error", title: "Erro de conexão!" });
    }
});

// DESCRIÇÃO DO LIVRO
const descricaoLivro2 = document.getElementById('descricaoLivro');
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("livro")) {
        const livroId = e.target.id.split("-")[1];

        const favoritosResponse = await fetch(APIListFavoritos);
        const favoritos = await favoritosResponse.json();
        const jaFavoritado = favoritos.some(f => f.livro_id == livroId);

        const reservadosResponse = await fetch(APIListReservados);
        const reservados = await reservadosResponse.json();
        const jaReservado = reservados.some(r => r.livro_id == livroId);

        descricaoLivro.innerHTML = `
            <h3 class="h3Descricao">${e.target.alt}</h3>
            <div class="descricao">
                <img class="imgDescricao" src="${e.target.src}">
                <p class="pDescricaoLivro">${e.target.dataset.descricao}</p>
            </div>
                <div class="final">
                <div class="estrelas">
                <img class="estrelaVazia" src="../../../frontEnd/img/estrelaVazia.png" alt="">
                <img class="estrelaVazia" src="../../../frontEnd/img/estrelaVazia.png" alt="">
                <img class="estrelaVazia" src="../../../frontEnd/img/estrelaVazia.png" alt="">
                <img class="estrelaVazia" src="../../../frontEnd/img/estrelaVazia.png" alt="">
                <img class="estrelaVazia" src="../../../frontEnd/img/estrelaVazia.png" alt="">
                </div>
                <div class="osdois">
                <button type="button" class="${jaReservado ? 'botaoReservar reservado' : 'botaoReservar'}" id="btnReserva-${livroId}">${jaReservado ? 'livro reservado' : 'Reservar livro'}</button>
                <img 
                    class="coracao ${jaFavoritado ? "favoritado" : ""}"
                    id="coracoFav-${livroId}"
                    src="${jaFavoritado ? '../../img/coracaoCheio.png' : '../../img/coracaoVazio.png'}"
                >
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

// RESERVAR LIVRO
document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("botaoReservar")) return;

    const idBtn = e.target.id;
    const livroId = idBtn.split("-")[1];

    const jaReservado = e.target.classList.contains("reservado");

    const url = jaReservado ? APIDesreservar : APIReservar;
    const metodo = jaReservado ? "DELETE" : "POST";

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
            Toast.fire({ icon: "error", title: "Erro no servidor!" });
            return;
        }

        if (metodo === "POST") {
            e.target.textContent = 'livro reservado'
            e.target.classList.add('reservado')
            Toast.fire({ icon: "success", title: "Livro reservado!" });

        } else {
            e.target.textContent = 'Reservar livro'
            e.target.classList.remove("reservado");
            Toast.fire({ icon: "success", title: "Reserva cancelada!" });
        }

    } catch (error) {
        console.error(error);
        Toast.fire({ icon: "error", title: "Erro de conexão!" });
    }

});

// POP UP FILTRO
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

// DARK MODE
const trilho = document.getElementById('trilho')
const body = document.querySelector('body')
trilho.addEventListener('click', () => {
    trilho.classList.toggle('dark')
    body.classList.toggle('dark')
})

const perfil = document.getElementById('perfil')
const popUpPerfil = document.getElementById('pop-up-perfil')
const perfilPop = document.getElementById('perfil-pop')

perfil.addEventListener('click', () => {
    popUpPerfil.classList.add('show');
})

popUpPerfil.addEventListener('click', (evento) => {
    if (evento.target === popUpPerfil) {
        popUpPerfil.classList.remove('show');
    }
})
