const bannerGameSlider = document.querySelectorAll('input[name="slider"]')
const gameTrailer = document.querySelector('.trailer')

/* on load */
disableSliderGames()
animateTrailer('diablo')
bannerGameSlider.forEach(item => item.addEventListener('change', changeBannerInfo))



/* FUNCTIONS */
function changeBannerInfo() {
    let selectedGame = this.id
    animateTrailer(selectedGame);
    setBannerImages(selectedGame);
    setBannerText(selectedGame);
};

function disableSliderGames() {
    const disabledGamesID = ['#starCraftII', '#diabloI']
    document.querySelectorAll(disabledGamesID).forEach(game => game.disabled = true)
}

function setBannerImages(game) {
    const wowOverlay = document.querySelector('.wow-overlay')
    const gameBackgroundOverlay = document.querySelector('.background-overlay')
    const gameBackground = document.querySelector('.background-banner');
    const gameLogo = document.querySelector('.game-logo')

    gameBackground.style.backgroundImage = `url(/assets/banner-hero/games/${game}-bg.png)`;
    gameLogo.style.backgroundImage = `url(/assets/banner-hero/games/${game}-logo.png)`;
    gameTrailer.style.backgroundImage = `url(/assets/banner-hero/games/${game}-animation-cover.png)`;
    if (game === 'wow') {
        gameBackgroundOverlay.style.backgroundImage = `url(/assets/banner-hero/games/${game}-bg-overlay.png)`;
        wowOverlay.style.display = 'block'
    } else {
        wowOverlay.style.display = ''
        gameBackgroundOverlay.style.backgroundImage = `url(/assets/banner-hero/games/${game}-bg-overlay.png)`;
    }

}

function setBannerText(game) {
    const gameHeaderText = document.querySelector('.game-info h1');
    const gameText = document.querySelector('.game-info p');
    const gameButton = document.querySelector('.game-info button');
    const PLAY_NOW = 'Jogue Agora'
    const PRE_ORDER = 'Reserve agora na pré-venda'

    const gameInfo = {
        diablo: {
            header: 'Retorne à escuridão com o game Diablo IV',
            text: 'O retorno de Lilith traz uma era de escuridão e sofrimento',
            button: PLAY_NOW,
        },
        hearthstone: {
            header: 'Novo pacote de Expansão de Hearthstone',
            text: 'A horda e aliança se encontram no vale alterac para lutar',
            button: PRE_ORDER,
        },
        wow: {
            header: 'Desbrave as Terras Sombrias em Shadowlands!',
            text: 'O que jaz além do mundo que você conhece?',
            button: PRE_ORDER,
        },
    }

    gameHeaderText.textContent = gameInfo[game].header
    gameText.textContent = gameInfo[game].text
    gameButton.textContent = gameInfo[game].button
}

function animateTrailer(game) {
    gameTrailer.addEventListener('mouseover', () => {
        gameTrailer.style.backgroundImage = `url(/assets/banner-hero/games/${game}-animation.gif)`;
    });
    gameTrailer.addEventListener('mouseout', () => {
        gameTrailer.style.backgroundImage = `url(/assets/banner-hero/games/${game}-animation-cover.png)`;
    });
}
