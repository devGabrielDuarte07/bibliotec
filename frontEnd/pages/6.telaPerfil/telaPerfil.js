const btnSair = document.getElementById("btnSair");

btnSair.addEventListener("click", () => {
  // Limpa todos os dados do localStorage
  localStorage.clear();
    // Redireciona para a página de login
    window.location.href = "/frontEnd/pages/index.html";
});