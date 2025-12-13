const APICarregarFoto = "http://localhost:3000/usuario/foto-perfil";

async function carregarFotoPerfil(alunoId) {
  try {
    const resposta = await fetch(`http://localhost:3000/usuario/foto-perfil/${alunoId}`);

    const texto = await resposta.text();

    if (!resposta.ok) {
      throw new Error("Erro ao carregar a foto de perfil");
    }

    const dados = JSON.parse(texto);
    return dados.foto_perfil || null;

  } catch (erro) {
    console.error("Erro ao carregar foto de perfil:", erro);
    return null;
  }
}


window.carregarFotoPerfil = carregarFotoPerfil;

document.addEventListener("DOMContentLoaded", async () => {
  const alunoId = localStorage.getItem("id");
  if (!alunoId) return;

  const foto = await window.carregarFotoPerfil(alunoId);
  if (!foto) return;

  document.querySelectorAll(".fotoPerfil, .perfil").forEach(img => {
    img.src = foto;
  });
});
