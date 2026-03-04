// Agora o email vem do localStorage, não da URL 👇
const email = localStorage.getItem("email_recuperacao");

const APIVerificarCodigo = "http://localhost:3000/verificacao/recuperacao/verificar";
const inputs = document.querySelectorAll(".codigo");
const btnVerificar = document.getElementById('btnVerificar');

// Configuração do Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

// Eventos de navegação entre inputs
inputs.forEach((input, index) => {

    // Avançar automaticamente ao digitar
    input.addEventListener("input", () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    // Voltar ao apagar
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
            inputs[index - 1].focus();
        }
    });

});

async function verificarCodigo(email, codigo) {
  try {
    const resposta = await fetch(APIVerificarCodigo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, codigo }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      Toast.fire({
        icon: "error",
        title: dados.erro || "Erro ao verificar código.",
      });
      return false;
    }

    Toast.fire({
      icon: "success",
      title: dados.mensagem || "Código verificado!",
    });

    // salva somente o ID
    localStorage.setItem("aluno_id", dados.aluno_id);

    return true;

  } catch (erro) {
    Toast.fire({
      icon: "error",
      title: `Erro: ${erro.message}`,
    });
    return false;
  }
}


// Evento do botão
btnVerificar.addEventListener('click', async () => {

    let codigoDigitado = "";

    inputs.forEach(input => {
        codigoDigitado += input.value;
    });

    const sucesso = await verificarCodigo(email, codigoDigitado);

    if (sucesso) {
        window.location.href = `../3.redefinirSenha/redefinirSenha.html`;

    } else {
        Toast.fire({
            icon: "warning",
            title: "Por favor, insira o código de verificação correto.",
        });
    }
});
