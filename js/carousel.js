const nextBtn = document.getElementById(`arrow-right`)
const previousBtn = document.getElementById(`arrow-left`)
let deslocamento = 0;
const passo = 470;
const limiteMax = -1880;
const exibirLivros = document.querySelector('.exibirLivros');

nextBtn.addEventListener(`click`, () => {
  deslocamento -= passo;
  
   if (deslocamento < limiteMax) {
    deslocamento = 0; // volta ao início
  }
  exibirLivros.style.transform = `translateX(${deslocamento}px)`;
})

previousBtn.addEventListener('click', () => {

  deslocamento += passo;
  if (deslocamento > 0) {
    deslocamento = limiteMax; // vai pro final
  }
  exibirLivros.style.transform = `translateX(${deslocamento}px)`;
})