const categoria = localStorage.getItem("categoriaSelecionada");

const id = window.localStorage.getItem(`id`);

const APIFav = `http://localhost:3000/favoritos/${id}`;
const APIDesfavoritar = "http://localhost:3000/favoritos/desfavoritar";
const APIListFavoritos = `http://localhost:3000/favoritos/${id}`;
const APIListReservados = `http://localhost:3000/reserva/${id}`;
const APIReservar = `http://localhost:3000/reserva/reservar`;
const APIDesreservar = `http://localhost:3000/reserva/desreservar`;
const APIFavoritar = "http://localhost:3000/favoritos/favoritar";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});
if (!categoria) {
  console.error("Categoria não encontrada no localStorage");

  throw new Error("Categoria não definida");
}
const APILivrosPorCategoria = `http://localhost:3000/livros/categoria/${categoria}`;
const conteiner = document.querySelector(".exibirLivros");
const tituloCategoria = document.getElementById("categoria");
tituloCategoria.textContent =
  categoria.charAt(0).toUpperCase() + categoria.slice(1);
async function carregarLivrosPorCategoria() {
  try {
    const resposta = await fetch(APILivrosPorCategoria);
    console.log(resposta);
    const dados = await resposta.json();
    if (!resposta.ok) {
      throw new Error(dados.erro || "Erro ao carregar livros por categoria");
    }
    console.log(dados);
    montarLivros(dados);
  } catch (erro) {
    console.error("Erro ao carregar livros por categoria:", erro);
  }
}

async function buscarFav() {
  try {
    const resposta = await fetch(APIFav);
    const texto = await resposta.text();
    if (!resposta.ok) {
      throw new Error("Erro ao buscar favoritos");
    }
    const dados = JSON.parse(texto);
    return dados;
  } catch (erro) {
    console.error("Erro ao buscar favoritos:", erro);
    return [];
  }
}

async function montarLivros(dados) {
    const favoritos = await buscarFav(); // busca uma vez só

    dados.forEach((livro) => {
        const divCard = document.createElement('div');
        divCard.classList.add('cardLivro');

        const jaFavoritado = favoritos.some(f => f.livro_id === livro.id);

        divCard.innerHTML = `
            <img src="${livro.capa_url}" 
                 alt="${livro.titulo}" 
                 class="livro"
                 data-descricao="${livro.descricao}"
                 data-genero="${livro.genero}"
                 id="livro-${livro.id}">

            <h2 class="nomesLivros">
                ${livro.titulo}
                <img 
                    class="coracao ${jaFavoritado ? "favoritado" : ""}" 
                    src="${
                        jaFavoritado
                            ? "../../img/coracaoCheio.png"
                            : "../../img/coracaoVazio.png"
                    }"
                    id="coracoFav-${livro.id}">
            </h2>
        `;

        conteiner.appendChild(divCard);
    });
}


carregarLivrosPorCategoria();

const descricaoLivro = document.getElementById("descricaoLivro");
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("livro")) {
    const livroId = e.target.id.split("-")[1];

    const favoritosResponse = await fetch(APIListFavoritos);
    const favoritos = await favoritosResponse.json();
    const jaFavoritado = favoritos.some((f) => f.livro_id == livroId);

    const reservadosResponse = await fetch(APIListReservados);
    const reservados = await reservadosResponse.json();
    const jaReservado = reservados.some((r) => r.livro_id == livroId);

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
                    <button type="button" class="${
                      jaReservado ? "botaoReservar reservado" : "botaoReservar"
                    }" id="btnReserva-${livroId}">
                        ${jaReservado ? "livro reservado" : "Reservar livro"}
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
        livro_id: livroId,
      }),
    });

    if (!requisicao.ok) {
      Toast.fire({ icon: "error", title: "Erro no servidor!" });
      return;
    }

    if (metodo === "POST") {
      e.target.textContent = "livro reservado";
      e.target.classList.add("reservado");
      Toast.fire({ icon: "success", title: "Livro reservado!" });
    } else {
      e.target.textContent = "Reservar livro";
      e.target.classList.remove("reservado");
      Toast.fire({ icon: "success", title: "Reserva cancelada!" });
    }
  } catch (error) {
    console.error(error);
    Toast.fire({ icon: "error", title: "Erro de conexão!" });
  }
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
        aluno_id: id,
        livro_id: livroId,
      }),
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