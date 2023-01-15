


disableSliderGames()
function disableSliderGames() {
    const disabledGamesID = ['#starCraftII', '#diabloI']
    document.querySelectorAll(disabledGamesID).forEach(game => game.disabled = true)
}


const bannerGameSlider = document.querySelectorAll('input[name="slider"]')
bannerGameSlider.forEach(item => item.addEventListener('change', changeBannerInfo))
function changeBannerInfo() {
    const gameHeaderText = document.querySelector('.game-info h1');
    const gameText = document.querySelector('.game-info p');
    const gameButton = document.querySelector('.game-info button');
    const gameBackground = document.querySelector('.background-banner');
    const gameLogo = document.querySelector('.game-logo')
    const gameTrailer = document.querySelector('.trailer')

    const PLAY_NOW = 'Jogue Agora'
    const PRE_ORDER = 'Reserve agora na pré-venda'

    const gameInfo = {
        diablo: {
            header: 'Retorne à escuridão com o game Diablo IV',
            text: 'O retorno de Lilith traz uma era de escuridão e sofrimento',
            button: PLAY_NOW,
        },
        hearthstone: {
            header:'Novo pacote de Expansão de Hearthstone',
            text:'A horda e aliança se encontram no vale alterac para lutar',
            button:PRE_ORDER,
        },
        wow: {
            header:'Desbrave as Terras Sombrias em Shadowlands!',
            text:'O que jaz além do mundo que você conhece?',
            button:PRE_ORDER,
        },
    }

    let selectedGame = this.id
    gameHeaderText.textContent = gameInfo[selectedGame].header
    gameText.textContent = gameInfo[selectedGame].text
    gameButton.textContent = gameInfo[selectedGame].button

    gameBackground.style.backgroundImage = `url(/assets/banner-hero/games/${selectedGame}-bg.png)`;
    gameLogo.style.backgroundImage = `url(/assets/banner-hero/games/${selectedGame}-logo.png)`;
    gameTrailer.style.backgroundImage = `url(/assets/banner-hero/games/${selectedGame}-animation-cover.png)`;
    gameTrailer.addEventListener('mouseover', () => {
        gameTrailer.style.backgroundImage = `url(/assets/banner-hero/games/${selectedGame}-animation.gif)`;
    });
    gameTrailer.addEventListener('mouseout', () => {
        gameTrailer.style.backgroundImage = `url(/assets/banner-hero/games/${selectedGame}-animation-cover.png)`;
    });
};


