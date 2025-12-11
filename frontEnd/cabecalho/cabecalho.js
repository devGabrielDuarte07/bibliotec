// async function carregarLayout() {

//     try {
//         const response = await fetch('/frontEnd/cabecalho/cabecalho.html');
//         const layout = await response.text(); 
//         document.body.insertAdjacentHTML("afterbegin", layout);

//         //  avisa que o cabeçalho foi carregado
//         document.dispatchEvent(new Event("cabecalho-carregado"));

//     } catch (erro) {
//         console.error("Erro ao carregar o layout:", erro);
//     }
// }
// carregarLayout();