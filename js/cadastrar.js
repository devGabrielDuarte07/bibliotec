const API = "http://localhost:3000/alunos"

const botaoAcao = document.getElementById('btnCadastrar');
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const inputConfirmarSenha = document.getElementById("confirmarSenha");
const formCadastrar = document.getElementById("cadastroUsuario")

async function salvar(e) {
    e.preventDefault();
    console.log("Salvando aluno");

    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();
    const confirmarSenha = inputConfirmarSenha.value.trim();

    if (!nome || !email || !senha || !confirmarSenha) {
        alert("Por gentileza, preencha os campos obrigatórios (nome, email, senha e confirmarSenha).");
        return;
    }
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const novoAluno = { nome, email, senha }
    console.log("Enviando:", novoAluno);

    try {
        const requisicao = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoAluno)
        });

        if (requisicao.ok) {
            const dados = await requisicao.json();
            console.log("Aluno salvo com sucesso:", dados);
            alert("Aluno cadastrado com sucesso!");
            window.location.href = "./index.html";
            formCadastrar.reset();
        } else {
            console.error("Erro na requisição:", requisicao.status);
            alert("Erro ao cadastrar aluno. Código: " + requisicao.status);
        }


    } catch (error) {
        console.error("Erro no fetch:", error);
        alert("Erro de conexão com o servidor.");
    }
}

formCadastrar.addEventListener("submit", salvar);