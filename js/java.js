const botaoAcao = document.getElementById('actionButton');
const nome = document.getElementById("User");
const senha = document.getElementById("senha");

botaoAcao.addEventListener('click', function() {
  // Validação dentro do evento
  if (nome.value.trim() === "" || senha.value.trim() === "") {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  window.location.href = "./telaInicial.html";
});


