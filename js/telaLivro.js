const API = "http://localhost:3000/livros"

const cliqueGuardado = localStorage.getItem('botaoClicado')

async function buscarDadosDoBanco() {
    try {
        const response = await fetch(API);
        if (!response.ok) {
            throw new Error('Erro na requisição à API');
        }

        const dados = await response.json();
        console.log('Dados recebidos:', dados);
        return dados; // retorna os dados para serem usados depois

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}

if (cliqueGuardado === "sim") {
    document.getElementById("mensagem").innerText = "O botão na página anterior foi clicado";
}

const livroSelecionado = JSON.parse(localStorage.getItem("livroSelecionado"));

if (livroSelecionado) {
    document.getElementById("titulo").innerText = livroSelecionado.titulo;
    document.getElementById("autor").innerText = livroSelecionado.autor;
    document.getElementById("capa").src = livroSelecionado.capa_url;


}



localStorage.removeItem('botaoClicado');