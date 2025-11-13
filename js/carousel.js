const nextBtn = document.getElementById(`arrow-right`)
const previousBtn = document.getElementById(`arrow-left`)

const passo = 470;
const limiteMax = -1880;
const categorias = ["Populares", "Mangas", "Romance", "Comedia", "Suspense", "Terror"]
const carousel = document.querySelector('.apenasLivros');
const limiteMin = 0;

categorias.forEach((categoria) => {
  const container = document.querySelector(`.exibirLivros.${categoria}`);
  const carousel = container.querySelector('.apenasLivros');
  const nextBtn = document.querySelector(`.controls${categoria} .arrow-right`);
  const prevBtn = document.querySelector(`.controls${categoria} .arrow-left`);

  let deslocamento = 0;

  nextBtn.addEventListener(`click`, () => {
    deslocamento -= passo;

    if (deslocamento < limiteMax) {
      deslocamento = 0; // volta ao início
    }
    carousel.style.transform = `translateX(${deslocamento}px)`;
  })

  prevBtn.addEventListener('click', () => {

    deslocamento += passo;
    if (deslocamento > 0) {
      deslocamento = limiteMax; // vai pro final
    }
    carousel.style.transform = `translateX(${deslocamento}px)`;
  })
})


