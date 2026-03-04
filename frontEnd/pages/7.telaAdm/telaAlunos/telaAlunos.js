const buscarAlunos = "http://localhost:3000/usuario/apenas-alunos";
const conteiner = document.getElementById("perfilAluno");
const listarAlunos = document.getElementById("listaAlunos");
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});



async function pegarAlunos() {
    try {
        const resposta = await fetch(buscarAlunos);
        const dados = await resposta.json();
        console.log(dados);

        dados.forEach((aluno) => {
            const alunoElemento = document.createElement("div");
            alunoElemento.classList.add("perfilAluno");
            alunoElemento.innerHTML = `
                <h3>Nome: ${aluno.nome}<br>Email: ${aluno.email}</h3>
            `;
            listarAlunos.appendChild(alunoElemento);
        });
    } catch (erro) {
        console.error("Erro ao buscar alunos:", erro);
    }
}
pegarAlunos();