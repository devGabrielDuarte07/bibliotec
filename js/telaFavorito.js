const APILivro = "http://localhost:3000/livros"

const id = window.localStorage.getItem(`id`)
const APIFav = `http://localhost:3000/favoritos/${id}`
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
    const divApenasLivro = document.createElement('div')
    divApenasLivro.classList.add('apenasLivro');
    
    alunosFav.forEach(livro => {
        const divCard = document.createElement('div')
       divCard.classList.add('cardLivro');
        const titulo = document.createElement('h3')
        const img = document.createElement('img')
        img.src = livro.capa_url;
        img.alt = livro.titulo;
        img.classList.add("livro")
        titulo.classList.add("nomesLivros")
        titulo.textContent = livro.titulo 

        
        divCard.appendChild(img);
        divCard.appendChild(titulo)
        exibirLivros.appendChild(divCard)
        

    })
    divApenasLivro.appendChild(divCard)
    exibirLivros.appendChild(divApenasLivro)
}

carregarLivrosFavoritos();