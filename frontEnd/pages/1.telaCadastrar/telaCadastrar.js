const API = "http://localhost:3000/usuario";
const APICurso = "http://localhost:3000/curso";
const APICriarCodigo = "http://localhost:3000/verificacao/cadastro";
const APIVerificarCodigo = "http://localhost:3000/verificacao/cadastro/verificar";

import { validarCPF } from "../../js/validarCPF.js";

const inputNome = document.getElementById("nome");
const inputCPF = document.getElementById("cpf");
const inputEmail = document.getElementById("email");
const dropDownCurso = document.getElementById("select-curso");
const inputSenha = document.getElementById("senha");
const inputConfirmarSenha = document.getElementById("confirmarSenha");
const formCadastrar = document.getElementById("cadastroUsuario");
const emailEnviado = document.getElementById("emailEnviado");
const popUpCodigo = document.getElementById("pop-up-codigo");
const inputsCodigo = document.querySelectorAll(".codigo");
const btnVerificar = document.getElementById('btnVerificar');

// Toast
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

// ---------------- Funções utilitárias ----------------
function contemMaiuscula(senha) { return /[A-Z]/.test(senha); }
function contemMinuscula(senha) { return /[a-z]/.test(senha); }
function contemNumero(senha) { return /[0-9]/.test(senha); }
function validarEmailDominio(email) { return email.includes('@') && email.endsWith('@aluno.senai.br'); }

function aplicarMascaraCPF() {
    let valor = inputCPF.value.replace(/\D/g, "").slice(0, 11);
    if (valor.length <= 3) inputCPF.value = valor;
    else if (valor.length <= 6) inputCPF.value = valor.replace(/(\d{3})(\d+)/, "$1.$2");
    else if (valor.length <= 9) inputCPF.value = valor.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    else inputCPF.value = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
}
inputCPF.addEventListener("input", aplicarMascaraCPF);

// ---------------- Cursos ----------------
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
carregarCursos();

// ---------------- Enviar e verificar código ----------------
async function enviarCodigo(email) {
    try {
        const res = await fetch(APICriarCodigo, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const dados = await res.json();
        if (!res.ok) {
            Toast.fire({ icon: "error", title: dados.erro || "Erro ao enviar código" });
            return false;
        }
        Toast.fire({ icon: "success", title: "Código enviado para o email!" });
        return true;
    } catch (erro) {
        Toast.fire({ icon: "error", title: `Erro: ${erro.message}` });
        return false;
    }
}

async function verificarCodigo(email, codigo) {
    try {
        const res = await fetch(APIVerificarCodigo, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, codigo }),
        });
        const dados = await res.json();
        if (!res.ok) {
            Toast.fire({ icon: "error", title: dados.erro || "Código incorreto" });
            return false;
        }
        Toast.fire({ icon: "success", title: dados.mensagem || "Código verificado!" });
        localStorage.setItem("aluno_id", dados.aluno_id);
        return true;
    } catch (erro) {
        Toast.fire({ icon: "error", title: `Erro: ${erro.message}` });
        return false;
    }
}

// ---------------- Fluxo do pop-up ----------------
function resetarInputsCodigo() {
    inputsCodigo.forEach(input => input.value = "");
    inputsCodigo[0].focus();
}

// Avançar/voltar automaticamente
inputsCodigo.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (input.value.length === 1 && index < inputsCodigo.length - 1)
            inputsCodigo[index + 1].focus();
    });
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0)
            inputsCodigo[index - 1].focus();
    });
});

// ---------------- Função salvar ----------------
formCadastrar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btnCadastrar = document.getElementById("btnCadastrar");

    // Desativa o botão
    btnCadastrar.disabled = true;
    btnCadastrar.style.opacity = "0.6";

    const nome = inputNome.value.trim();
    const cpf = inputCPF.value.trim();
    const cpfLimpo = cpf.replace(/\D/g, "");
    const email = inputEmail.value.trim();
    const curso_id = dropDownCurso.value;
    const senha = inputSenha.value;
    const confirmarSenha = inputConfirmarSenha.value;

    try {
        // ---------------- Validações ----------------
        if (!nome || !email || !senha || !confirmarSenha) {
            Toast.fire({ icon: "warning", title: "Preencha todos os campos obrigatórios!" });
            throw new Error();
        }
        if (cpfLimpo.length !== 11 || !validarCPF(cpfLimpo)) {
            Toast.fire({ icon: "error", title: "CPF inválido!" });
            throw new Error();
        }
        if (!validarEmailDominio(email)) {
            Toast.fire({ icon: "warning", title: "Use um email @aluno.senai.br" });
            throw new Error();
        }
        if (senha.length < 8 || senha.length > 128) {
            Toast.fire({ icon: "warning", title: "Senha deve ter entre 8 e 128 caracteres" });
            throw new Error();
        }
        if (!contemMaiuscula(senha) || !contemMinuscula(senha) || !contemNumero(senha)) {
            Toast.fire({ icon: "warning", title: "Senha precisa de maiúsculas, minúsculas e números" });
            throw new Error();
        }
        if (senha.includes(" ")) {
            Toast.fire({ icon: "warning", title: "Senha não pode conter espaços" });
            throw new Error();
        }
        if (senha !== confirmarSenha) {
            Toast.fire({ icon: "error", title: "As senhas não coincidem!" });
            throw new Error();
        }

        emailEnviado.textContent = `Email enviado para: ${email}`;

        // ---------------- Enviar código ----------------
        const codigoEnviado = await enviarCodigo(email);
        if (!codigoEnviado) throw new Error();

        resetarInputsCodigo();
        popUpCodigo.style.display = "flex";

        // Desativa o botão verificar para evitar múltiplos cliques
        let btnVerificarAtivo = true;
        btnVerificar.onclick = async () => {
    if (!btnVerificarAtivo) return; // já clicado
    btnVerificarAtivo = false;
    btnVerificar.disabled = true;
    btnVerificar.style.opacity = "0.6";

    // Única declaração de codigoDigitado
    const codigoDigitado = Array.from(inputsCodigo).map(input => input.value).join("");

    const sucesso = await verificarCodigo(email, codigoDigitado);
    if (!sucesso) {
        btnVerificarAtivo = true;
        btnVerificar.disabled = false;
        btnVerificar.style.opacity = "1";
        return;
    }

    popUpCodigo.style.display = "none";

    const novoAluno = { nome, cpf: cpfLimpo, email, senha, curso_id };

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoAluno),
        });
        if (res.ok) {
            Toast.fire({ icon: "success", title: "Aluno cadastrado com sucesso!" });
            formCadastrar.reset();
            setTimeout(() => window.location.href = "../index.html", 1500);
        } else if (res.status === 409) {
            Toast.fire({ icon: "error", title: "Este email já está cadastrado." });
        } else {
            Toast.fire({ icon: "error", title: "Erro ao cadastrar. Código: " + res.status });
        }
    } catch (erro) {
        Toast.fire({ icon: "error", title: "Erro de conexão com o servidor." });
    } finally {
        btnCadastrar.disabled = false;
        btnCadastrar.style.opacity = "1";
    }
};


    } catch {
        // Se algum erro ocorrer nas validações, reativa o botão cadastrar
        btnCadastrar.disabled = false;
        btnCadastrar.style.opacity = "1";
    }
});

