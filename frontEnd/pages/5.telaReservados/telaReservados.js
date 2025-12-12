const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

const APILivro = "http://localhost:3000/livros"

const idAluno = window.localStorage.getItem(`id`)


const APIListReservados = `http://localhost:3000/reserva/${idAluno}`;

const APIReserva = `http://localhost:3000/reserva/reservar`;

const APIDesreservar = `http://localhost:3000/reserva/desreservar`

console.log(idAluno)

const exibirLivros = document.querySelector('.exibirLivros');

async function buscarLivrosReservados() {
    try {
        const response = await fetch(APIListReservados);
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

    const alunosFav = await buscarLivrosReservados();
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
                    id="lixeira-${livro.livro_id}"
                >
            </h3>`;

        exibirLivros.appendChild(divCard)
    })

    exibirLivros.appendChild(divApenasManga)
}

carregarLivrosFavoritos();



// DESCRIÇÃO DO LIVRO
const descricaoLivro = document.getElementById('descricaoLivro');

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("livro")) {
        const livroId = e.target.id.split("-")[1];

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

document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("botaoReservar")) return;

    const idBtn = e.target.id;
    const livroId = idBtn.split("-")[1];


    try {
        const requisicao = await fetch(APIDesreservar, {
            method: "DELETE",
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

        if(requisicao.ok){
            Toast.fire({ icon: "success", title: "Livro desreservado!" });
            
            setTimeout(() => window.location.reload(), 1500);
        }

    } catch (error) {
        console.error(error);
        Toast.fire({ icon: "error", title: "Erro de conexão!" });
    }

});

document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("coracaoFav2")) return;

    const idLixeira = e.target.id;
    const livroId = idLixeira.split("-")[1];


    try {
        const requisicao = await fetch(APIDesreservar, {
            method: "DELETE",
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

        
        if(requisicao.ok){
            Toast.fire({ icon: "success", title: "Livro desreservado!" });
            
            setTimeout(() => window.location.reload(), 1500);
        }
        

    } catch (error) {
        console.error(error);
        Toast.fire({ icon: "error", title: "Erro de conexão!" });
    }

});
