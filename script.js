const bannerGameSlider = document.querySelectorAll('input[name="slider"]')
const gameTrailer = document.querySelector('.trailer')

/* on load */
disableSliderGames()
animateTrailer('diablo')
updateDownloadButton()
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

function updateDownloadButton() {
    OS = getUserOS()
    const logo = document.querySelector('#OSLogo')
    const osName = document.querySelector('#OSName')
    const downloadTo = "Baixar para o "

    if (OS === "mac") {
        logo.style.backgroundImage = `url(/assets/svg/os-mac-icon.svg)`
        osName.textContent = downloadTo + 'MacOS'
    }
    else if (OS === "linux") {
        logo.style.backgroundImage = `url(/assets/svg/os-linux-icon.svg)`
        osName.textContent = downloadTo + 'Linux'
    }
    else {
        logo.style.backgroundImage = `url(/assets/svg/os-windows-icon.svg)`
        osName.textContent = downloadTo + 'Windows'
    }
}

function getUserOS() {
    let OS
    if (navigator.userAgent.indexOf("Win") != -1) {
        OS = "windows";
    }
    if (navigator.userAgent.indexOf("Mac") != -1) {
        OS = "mac";
    }
    if (navigator.userAgent.indexOf("Linux") != -1) {
        OS = "linux";
    }
    return OS
}



const API_URL = 'https://api.brchallenges.com/api/blizzard/games'

async function getAPI(url) {

    const response = await fetch(url);

    let data = await response.json();
    createNewCard(data);
}

getAPI(API_URL);

function createNewCard(games) {
    const gamesWrapper = document.getElementsByClassName('games-wrapper');

    for (let game of games){
        const newCard = document.createElement('div');
        newCard.className = 'card';
        gamesWrapper[0].appendChild(newCard);
        setCardBackground(newCard, game.image, game.logo);
        setGameInfo(newCard, game.name, game.category)
    };

     const lastCard = document.createElement('div');
     lastCard.className = 'last-card';
     gamesWrapper[0].appendChild(lastCard);
     const blizzardLogo = document.createElement('img');
     blizzardLogo.src = './assets/blizzard-logo.svg';
     lastCard.appendChild(blizzardLogo);
     const lastCardText = document.createElement('p');
     lastCardText.textContent = 'Ver todos jogos';
     lastCard.appendChild(lastCardText);
}


function setCardBackground(card, bgImage, logo) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-background-wrapper';

    const background = document.createElement('div');
    background.className = 'card-game-background';
    background.style.backgroundImage = `url(${bgImage})`;
    wrapper.appendChild(background);
    
    const overlay = document.createElement('div');
    overlay.className = 'card-game-overlay';
    wrapper.appendChild(overlay);

    const gameLogo = document.createElement('div');
    gameLogo.className = 'card-game-logo';
    gameLogo.style.backgroundImage = `url(${logo})`;
    wrapper.appendChild(gameLogo);


    card.appendChild(wrapper);
}

function setGameInfo(card, gameName, gameCategory) {
    const name = document.createElement('div');
    name.className = 'card-game-name';
    name.textContent = `${gameName}`
    card.appendChild(name);

    const category = document.createElement('div');
    category.className = 'card-game-genre';
    category.textContent  = `${gameCategory}`
    card.appendChild(category)
}