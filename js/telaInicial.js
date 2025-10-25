const track = document.querySelector('.exibirLivros');
const cards = Array.from(track.children);
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

let index = 0;
const visibleCards = 4; // quantos aparecem na tela
const cardWidth = cards[0].offsetWidth + 20; // largura + gap

function updateCarousel() {
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

rightArrow.addEventListener('click', () => {
  if (index < cards.length - visibleCards) {
    index++;
    updateCarousel();
  }
});

leftArrow.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});
