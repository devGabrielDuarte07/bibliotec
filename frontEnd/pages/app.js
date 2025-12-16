<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
const APILogin = "http://localhost:3000/login"
const botaoAcao = document.getElementById('actionButton');
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");

// Toast SweetAlert2
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

botaoAcao.addEventListener('click', async function (event) {
  event.preventDefault();

  const email = inputEmail.value.trim();
  const senha = inputSenha.value.trim();

  // Validação inicial
  if (!email || !senha) {
    Toast.fire({
      icon: "warning",
      title: "Preencha todos os campos!"
    });
    return;
  }

  try {
    const response = await fetch(APILogin, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const dado = await response.json();

    // Erro retornado pela API
    if (!response.ok) {
      Toast.fire({
        icon: "error",
        title: dado.erro || "Erro ao fazer login"
      });
      return;
    }

    const perfil = dado.aluno.perfil;
    
    localStorage.setItem("token", dado.token);
    localStorage.setItem("aluno", JSON.stringify(dado.aluno));
    localStorage.setItem("id", dado.aluno.id);

    Toast.fire({
      icon: "success",
      title: "Login realizado!"
    });
    

    // Aguarda o Toast para redirecionar
    setTimeout(() => {
      if (perfil === "aluno") {
        window.location.href = "2.telaInicial/telaInicial.html";
      } else {
        window.location.href = "7.telaAdm/telaAdm.html";
      }
    }, 500);

  } catch (error) {
    console.error("Erro:", error);
    Toast.fire({
      icon: "error",
      title: "Erro de conexão com o servidor."
    });
  }
});