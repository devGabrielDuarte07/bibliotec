
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

const perfil = document.getElementById('perfil')
    const popUpPerfil = document.getElementById('pop-up-perfil')
    const perfilPop = document.getElementById('perfil-pop')

    perfil.addEventListener('click', () => {

         popUpPerfil.classList.add('show');
    })

    popUpPerfil.addEventListener('click', (evento) => {
        if (evento.target === popUpPerfil) {
            popUpPerfil.classList.remove('show');
        }
    })

    