document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // Verifica se o token está presente
  if (!token) {
    console.error("Token não encontrado no localStorage");
    return;
  }

  // Decodifica o token
  const payload = JSON.parse(atob(token.split(".")[1]));
  const perfil = payload.perfil;

  // Verifica se a imagem logo existe no DOM
  const imagemLogo = document.getElementById("imagemLogo");

  if (!imagemLogo) {
    console.error("Elemento imagemLogo não encontrado no DOM");
    return;
  }

  // Adiciona o evento de clique na imagem logo
  imagemLogo.addEventListener("click", () => {
    if (perfil === "aluno") {
      window.location.href = "/frontEnd/pages/2.telaInicial/telaInicial.html";
    } else {
      window.location.href = "/frontEnd/pages/2.telaInicial/telaInicial.html";
    }
  });
});