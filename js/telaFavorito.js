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
    const divApenasManga = document.createElement('div')
    divApenasManga.classList.add('apenasMangas');
    
    alunosFav.forEach(livro => {
        const img = document.createElement('img')
        img.src = livro.capa_url;
        img.alt = livro.titulo;
        img.classList.add("manga")
        divApenasManga.appendChild(img)
        

    })
    exibirLivros.appendChild(divApenasManga)
}

carregarLivrosFavoritos();