// globalAuth.js

// Função para pegar o perfil do token JWT
export function getPerfilDoToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.perfil;
  } catch {
    return null;
  }
}

// Função para validar acesso à página
export function validarAcesso(perfisPermitidos) {
  const perfil = getPerfilDoToken();

  if (!perfil || !perfisPermitidos.includes(perfil)) {
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "error",
        title: "Acesso negado!",
        text: "Redirecionando...",
        timer: 1000,
        showConfirmButton: false,
        timerProgressBar: true
      });
    }
    
    setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("aluno");
        localStorage.removeItem("id");
      window.location.href = "/frontEnd/pages/12.telaErro/telaErro.html";
    }, 1000);

    return false;
  }

  return true;
}
