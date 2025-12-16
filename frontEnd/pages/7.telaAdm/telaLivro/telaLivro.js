
const conteiner = document.getElementById("conteiner");
const APILivros = "http://localhost:3000/livros";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});





async function buscarDadosDoBanco() {
  try {
    const response = await fetch(APILivros);
    if (!response.ok) {
      throw new Error("Erro na requisição à API");
    }

    const dados = await response.json();
    console.log("Dados recebidos:", dados);
    return dados;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    Toast.fire({ icon: "error", title: "Erro ao carregar livros!" });
    return null;
  }
}

function criarCardLivro(livro) {
  const card = document.createElement("div");
  card.classList.add("cardLivro");
  card.id = `livro-${livro.id}`;
  card.innerHTML = `
        <img class="livro" src="${livro.capa_url}" alt="Capa do livro ${livro.titulo}" id="livro-${livro.id}">
        <h3 class="titulo-livro">${livro.titulo}</h3>
    `;
  return card;
}

async function carregarLivros() {
  const dados = await buscarDadosDoBanco();
  if (dados) {
    dados.forEach((livro) => {
      const cardLivro = criarCardLivro(livro);
      conteiner.appendChild(cardLivro);
    });
    Toast.fire({ icon: "success", title: "Livros carregados!" });
  }
}

carregarLivros();


const descricaoLivro2 = document.getElementById('descricaoLivro');
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("livro")) {
        const livroId = e.target.id.split("-")[1];
        const dadosLivro = await fetch(`${APILivros}/${livroId}`);
        const dados = await dadosLivro.json();


        descricaoLivro.innerHTML = `
            <h3 class="h3Descricao">${dados.titulo}</h3>
            <div class="descricao">
                <img class="imgDescricao" src="${e.target.src}">
                <p class="pDescricaoLivro">${dados.descricao}</p>
            </div>
            <div class="botoes">
                 <button class="editarLivroBotao">Editar livro</button>
                 <button class="excluirLivroBotao">Excluir livro</button>
                </div>
                </div>
        `
        descricaoLivro2.classList.add("ativa");

        return;
    }

    if (!descricaoLivro2.contains(e.target)) {
        descricaoLivro2.classList.remove("ativa");
    }

});


const botaoAdd = document.getElementById('botaoAdd');
const adicionarLivro = document.getElementById('adicionarLivro');

botaoAdd.addEventListener("click", () => {
    adicionarLivro.innerHTML = `
       addicionar livro aqui
    `
    adicionarLivro.classList.add("ativa");
});

document.addEventListener("click", (e) => {
    if (!adicionarLivro.contains(e.target) && e.target !== botaoAdd) {
        adicionarLivro.classList.remove("ativa");
    }
});