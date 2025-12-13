const inputFoto = document.getElementById("foto");
const btnFoto = document.getElementById("fotoPerfil");

const APISalvarFotoPerfil = "http://localhost:3000/usuario/foto-perfil";
const TAMANHO_MAX = 200 * 1024;

btnFoto.addEventListener("click", () => {
  inputFoto.click();
});


inputFoto.addEventListener("change", async function () {
  const file = this.files[0];
  if (!file) return;

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    alert("A imagem deve ser JPG ou PNG");
    inputFoto.value = "";
    return;
  }

  if (file.size > TAMANHO_MAX) {
    alert("A imagem deve ter no máximo 200KB");
    inputFoto.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = async (e) => {
    const base64 = e.target.result;
    btnFoto.src = base64;

    const alunoId = localStorage.getItem("id");
    if (!alunoId) {
      alert("Usuário não identificado");
      return;
    }

    try {
      const response = await fetch(APISalvarFotoPerfil, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aluno_id: alunoId,
          foto_base64: base64,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar a foto");
      }

      const data = await response.json();
      console.log("Foto salva com sucesso:", data);
    } catch (error) {
      console.error("Erro ao salvar foto de perfil:", error);
      alert("Erro ao salvar a foto");
    }
  };

  reader.readAsDataURL(file);
});

