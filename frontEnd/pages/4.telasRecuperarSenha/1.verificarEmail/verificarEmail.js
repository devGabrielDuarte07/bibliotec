const APICriarCodigo = "http://localhost:3000/verificacao/recuperacao";

const inputEmail = document.getElementById("email");
const btnEnviarCodigo = document.getElementById("btnConfirmarEmail");

// Salva o texto original do botão
const textoOriginalBotao = btnEnviarCodigo.textContent;

// Configuração padrão do Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

async function enviarCodigo(email) {
  try {
    // muda estado do botão
    btnEnviarCodigo.disabled = true;
    btnEnviarCodigo.textContent = "Enviando...";

    const resposta = await fetch(APICriarCodigo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      // ❌ Erro do servidor
      Toast.fire({
        icon: "error",
        title: dados.erro || "Erro ao enviar código de verificação.",
      });
      return false;
    }

    // ✅ Envio bem sucedido
    Toast.fire({
      icon: "success",
      title: "Código enviado para o email!",
    });

    return true;

  } catch (erro) {
    // ❌ Erro de conexão
    Toast.fire({
      icon: "error",
      title: `Erro: ${erro.message}`,
    });
    return false;

  } finally {
    // volta o botão ao normal
    btnEnviarCodigo.disabled = false;
    btnEnviarCodigo.textContent = textoOriginalBotao;
  }
}

btnEnviarCodigo.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = inputEmail.value.trim();

  if (email === "") {
    Toast.fire({
      icon: "warning",
      title: "Por favor, insira seu email.",
    });
    return;
  }

  const sucesso = await enviarCodigo(email);

  if (sucesso) {

    // 👉 Salva email no localStorage
    localStorage.setItem("email_recuperacao", email);

    // 👉 Redireciona
    window.location.href = `../2.verifcarCodigo/verificarCodigo.html`;
  }
});
