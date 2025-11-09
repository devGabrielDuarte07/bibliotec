const API = "http://localhost:3000/livros"

const campoPesquisa = document.querySelector('.inputCampo');
const exibirLivros = document.querySelector('.exibirLivros');



async function buscarDadosDoBanco() {
    try {
        const response = await fetch(API);
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

async function carregarLivros() {
    const dados = await buscarDadosDoBanco();
    exibirLivros.innerHTML = '';
    const divApenasMangas = document.createElement('div')
    const divNomesMangas = document.createElement('div')
    dados.forEach(livro => {
        // criando as div

        const divCard = document.createElement('div')
        const nomeManga = document.createElement('h2')

        // colocando as class nas div
        divApenasMangas.classList.add('apenasMangas')
        divNomesMangas.classList.add('nomesMangas')
        divCard.classList.add('cardLivro');
        divCard.setAttribute('data-titulo', livro.titulo);


        divCard.innerHTML = `
                <img src="${livro.capa_url}" alt="${livro.titulo}" class="manga">
                `

        nomeManga.classList.add('titulo')
        nomeManga.textContent = livro.titulo

        divApenasMangas.appendChild(divCard)
        exibirLivros.appendChild(divApenasMangas)
        exibirLivros.appendChild(divNomesMangas)
        divNomesMangas.appendChild(nomeManga);

        divCard.addEventListener('click', () => {
            console.log("Livro clicado:", livro);
            localStorage.setItem("botaoClicado", "sim")
            localStorage.setItem("livroSelecionado", JSON.stringify(livro)); // s
            window.location.href = "./telaLivro.html";
        })
    })


    //busca os livros
    const livros = document.querySelectorAll('.cardLivro');
    const h1 = document.getElementById('h1Populares')
    campoPesquisa.addEventListener('input', () => {
        const termo = campoPesquisa.value.toLowerCase().trim();

        livros.forEach(livro => {
            const titulo = livro.getAttribute('data-titulo').toLowerCase();


            if (titulo.includes(termo)) {
                livro.style.display = 'flex'; // mostra
                h1.style.display = 'none'
            } else {
                livro.style.display = 'none'; // esconde
            }

            if (campoPesquisa.value === "") {
                h1.style.display = 'flex'
            }
        });
    });
}

carregarLivros();


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