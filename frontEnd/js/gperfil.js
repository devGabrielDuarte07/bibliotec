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