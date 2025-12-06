const APILogin = "http://localhost:3000/login"

const botaoAcao = document.getElementById('actionButton');
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");



botaoAcao.addEventListener('click', async function (event) {
  // Validação dentro do evento
  event.preventDefault();

  const email = inputEmail.value.trim();
  const senha = inputSenha.value.trim();
  if (!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const response = await fetch(APILogin, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    })

    const dado = await response.json();

    if (!response.ok) {
      alert(dado.erro || "Erro ao fazer login");
      return;
    }
    const perfil = dado.aluno.perfil;

    localStorage.setItem("aluno", JSON.stringify(dado.aluno));
    localStorage.setItem("id", dado.aluno.id);

    // Redirecionar
    if (perfil === "aluno") {
      window.location.href = "2.telaInicial/telaInicial.html";
    } else {
      window.location.href = "./telaTeste.html";
    }

  } catch (error) {
    console.log("Erro:", error);
    alert("Erro de conexão com o servidor.");
  }

}

)
