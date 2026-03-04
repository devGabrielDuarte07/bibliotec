const alunoId = localStorage.getItem("aluno_id");

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

// Verifica se existe aluno_id
if (!alunoId) {
  Toast.fire({
    icon: "error",
    title: "Nenhum usuário encontrado. Faça novamente o processo."
  });

  setTimeout(() => {
    window.location.href = "../1.verificarEmail/verificarEmail.html";
  }, 2000);

}

const APIRedefinirSenha = `http://localhost:3000/verificacao/senha/${alunoId}`;

const inputSenha = document.getElementById("senha");
const inputConfirmarSenha = document.getElementById("confirmarSenha");
const btnRedefinirSenha = document.getElementById("btnRedefinirSenha")
const formRedefinir = document.getElementById("redefinirSenha")

function contemMaiuscula(senha) {
  return /[A-Z]/.test(senha);
}
function contemMinuscula(senha) {
  return /[a-z]/.test(senha);
}
function contemNumero(senha) {
  return /[0-9]/.test(senha);
}

async function salvar(e) {
  e.preventDefault();

  const senha = inputSenha.value.trim();
  const confirmarSenha = inputConfirmarSenha.value.trim();

  if (senha.length < 8) {
    Toast.fire({ icon: "warning", title: "A senha deve ter pelo menos 8 caracteres." });
    return;
  }

  if (senha.length > 128) {
    Toast.fire({ icon: "warning", title: "A senha não pode ter mais que 128 caracteres." });
    return;
  }

  if (!contemMaiuscula(senha) || !contemMinuscula(senha)) {
    Toast.fire({ icon: "warning", title: "A senha deve ter maiúscula e minúscula." });
    return;
  }

  if (!contemNumero(senha)) {
    Toast.fire({ icon: "warning", title: "A senha deve conter pelo menos um número." });
    return;
  }

  if (senha.includes(" ")) {
    Toast.fire({ icon: "warning", title: "A senha não pode conter espaços." });
    return;
  }

  if (senha !== confirmarSenha) {
    Toast.fire({ icon: "error", title: "As senhas não coincidem." });
    return;
  }

  try {
    const requisicao = await fetch(APIRedefinirSenha, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nova_senha: senha })
    });

    if (requisicao.ok) {
      const dados = await requisicao.json();
      console.log("Aluno salvo com sucesso:", dados);

      Toast.fire({
        icon: "success",
        title: "Senha redefinida! Redirecionando..."
      });

      // Limpa o aluno_id
      localStorage.removeItem("aluno_id");

      setTimeout(() => {
        window.location.href = "../../index.html";
      }, 2000);

    } else {
      Toast.fire({
        icon: "error",
        title: `Erro ao cadastrar. Código: ${requisicao.status}`
      });
    }

  } catch (error) {
    console.error("Erro no fetch:", error);
    Toast.fire({
      icon: "error",
      title: "Erro de conexão com o servidor."
    });
  }
}

formRedefinir.addEventListener("submit", salvar);
