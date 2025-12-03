

const filtro = document.getElementById('filtro')
const popUpFiltro = document.getElementById('pop-up-filtro')
const filtroPop = document.getElementById('filtro-pop')

filtro.addEventListener('click', () => {

    popUpFiltro.classList.add('show');
})

popUpFiltro.addEventListener('click', (evento) => {
    if (evento.target === popUpFiltro) {
        popUpFiltro.classList.remove('show');
    }
})


