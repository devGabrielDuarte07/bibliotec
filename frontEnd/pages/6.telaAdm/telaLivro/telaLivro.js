const img = document.getElementById("imagemLogo");

img.addEventListener("click", () => {
    window.location.href = "/frontEnd/pages/2.telaInicial/telaInicial.html";
})

const descricaoLivro2 = document.getElementById('descricaoLivro');
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("livro")) {
        const livroId = e.target.id.split("-")[1];

       
        descricaoLivro.innerHTML = `
            <h3 class="h3Descricao">${e.target.alt}</h3>
            <div class="descricao">
                <img class="imgDescricao" src="${e.target.src}">
                <p class="pDescricaoLivro">,l,kl,l</p>
            </div>
             
                </div>
                </div>
        `
        descricaoLivro.classList.add("ativa");

        return;
    }

    if (!descricaoLivro.contains(e.target)) {
        descricaoLivro.classList.remove("ativa");
    }
});