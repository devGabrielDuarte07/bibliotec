const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputCpf = document.getElementById("CPF");
const botaoSalvar = document.getElementById("botaoSalvar");
const APICurso = "http://localhost:3000/curso";
const dropDownCurso = document.getElementById("select-curso");
const id = localStorage.getItem("id");
const APIAluno = `http://localhost:3000/usuario/${id}`;

let aluno; // variável global

async function fetchAluno() {
    try {
        const res = await fetch(APIAluno);
        if (!res.ok) throw new Error("Erro na requisição à API");
        return await res.json();
    } catch (erro) {
        console.error("Erro ao buscar aluno:", erro);
        return null;
    }
}

async function carregarCursos() {
    try {
        const res = await fetch(APICurso);
        if (!res.ok) throw new Error("Erro na requisição à API");
        const dados = await res.json();
        dados.forEach(curso => {
            const option = document.createElement("option");
            option.value = curso.id;
            option.textContent = curso.nome;
            dropDownCurso.appendChild(option);
        });
    } catch (erro) {
        console.error("Erro ao carregar cursos:", erro);
    }
}

async function preencherCampos() {
    aluno = await fetchAluno();
    if (!aluno) {
        Toast.fire({ icon: "error", title: "Aluno não encontrado!" });
        return;
    }

    inputNome.value = aluno.nome;
    inputEmail.value = aluno.email;
    inputCpf.value = aluno.CPF;
    dropDownCurso.value = aluno.curso_id;
}

// Espera os cursos carregarem antes de preencher os campos
(async () => {
    await carregarCursos();
    await preencherCampos();
})();

botaoSalvar.addEventListener("click", async () => {
    if (!aluno) return;

    try {
        const requisicao = await fetch(`http://localhost:3000/usuario/${aluno.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: inputNome.value,
                email: inputEmail.value,
                CPF: inputCpf.value,
                curso_id: dropDownCurso.value
            })
        });

        if (!requisicao.ok) {
            Toast.fire({ icon: "error", title: "Erro ao salvar dados!" });
            return;
        }

        Toast.fire({ icon: "success", title: "Dados salvos com sucesso!" });
        const alunoAtualizado = await requisicao.json();
        localStorage.setItem("aluno", JSON.stringify(alunoAtualizado));
        setTimeout(() => window.location.href = "../telaPerfil.html", 1500);

    } catch (error) {
        console.error(error);
        Toast.fire({ icon: "error", title: "Erro de conexão!" });
    }
});
