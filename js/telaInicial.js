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

    dados.forEach(livro => {
        const divCard = document.createElement('div')
        divCard.classList.add('cardLivro');
        divCard.setAttribute('data-titulo', livro.titulo);
        divCard.innerHTML = `
    <img src="${livro.capa_url}" alt="${livro.titulo}" class="manga">
`;


        exibirLivros.appendChild(divCard);
    })
    const livros = document.querySelectorAll('.cardLivro');

    campoPesquisa.addEventListener('input', () => {
        const termo = campoPesquisa.value.toLowerCase().trim();

        livros.forEach(livro => {
            const titulo = livro.getAttribute('data-titulo').toLowerCase();

            if (titulo.includes(termo)) {
                livro.style.display = 'flex'; // mostra
            } else {
                livro.style.display = 'none'; // esconde
            }
        });
    });

}




carregarLivros();