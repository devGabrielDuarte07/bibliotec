const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

const APILivro = "http://localhost:3000/livros"

const id = window.localStorage.getItem(`id`)
const APIFav = `http://localhost:3000/favoritos/${id}`
const APIDesfavoritar = 'http://localhost:3000/favoritos/desfavoritar'
const APIListFavoritos = `http://localhost:3000/favoritos/${id}`;
const APIListReservados = `http://localhost:3000/reserva/${id}`;
const APIReservar = `http://localhost:3000/reserva/reservar`;

const APIDesreservar = `http://localhost:3000/reserva/desreservar`
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
        return dados;

    } catch (error) {
        console.error('Erro ao buscar Livros:', error);
        Toast.fire({ icon: "error", title: "Erro ao carregar favoritos!" });
        return null;
    }
}

async function carregarLivrosFavoritos() {

    const alunosFav = await buscarAlunosFav();
    const divApenasManga = document.createElement('div')
    divApenasManga.classList.add('apenasMangas');

    alunosFav.forEach(livro => {
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

        exibirLivros.appendChild(divCard)
    })

    exibirLivros.appendChild(divApenasManga)
}

carregarLivrosFavoritos();

// DESFAVORITAR
document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("coracaoFav2")) return;

    const idCoracao = e.target.id;
    const livroId = idCoracao.split("-")[1];

    try {
        const requisicao = await fetch(APIDesfavoritar, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                aluno_id: id,
                livro_id: livroId
            })
        });

        if (!requisicao.ok) {
            Toast.fire({ icon: "error", title: "Erro no servidor!" });
            return;
        }

        Toast.fire({ icon: "success", title: "Livro removido dos favoritos!" });
        setTimeout(() => window.location.reload(), 600);

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
                    <button type="button" class="${jaReservado ? 'botaoReservar reservado' : 'botaoReservar'}" id="btnReserva-${livroId}">
                        ${jaReservado ? 'livro reservado' : 'Reservar livro'}
                    </button>
                    
                </div>
            </div>
        `;

        descricaoLivro.classList.add("ativa");

        // Aqui você pode adicionar o Toast
        if (jaReservado) {
            Toast.fire({ icon: "info", title: "Este livro já está reservado!" });
        } else {
            Toast.fire({ icon: "success", title: "Livro disponível para reserva!" });
        }

        return;
    }

    if (!descricaoLivro.contains(e.target)) {
        descricaoLivro.classList.remove("ativa");
    }
});

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
                aluno_id: id,
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

