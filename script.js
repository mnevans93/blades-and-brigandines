//GLOBAL VARIABLES

//AUDIO FILE VARIABLES
const simpleClick = new Audio('Audio/simpleClick.wav')
const startMusic = new Audio('Audio/aftermath.mp3')
const cutsceneMusic = new Audio('Audio/anxiety.mp3')

//QUERY SELECTOR ALL VARIABLES
const allButtons = document.querySelectorAll('button')
const playerNameSpan = document.querySelectorAll('.playerNameSpan')
const allStatDecrementers = document.querySelectorAll('.statDecrementers')
const allStatIncrementers = document.querySelectorAll('.statIncrementers')
const statLists = document.querySelectorAll('.statList')
const cutsceneElements = document.querySelectorAll('#cutscene > h1')

//GET ELEMENT BY ID VARIABLES
const loadBtn = document.getElementById('loadButton')
const startScreen = document.getElementById('startScreen')
const startGameBtn = document.getElementById('startGame')
const howToPlayBtn = document.getElementById('howToPlay')
const assetsBtn = document.getElementById('assets')
const howToPlayModal = document.getElementById('howToPlayModal')
const closeHowToPlayBtn = document.getElementById('closeHowToPlay')
const characterStatScreen = document.getElementById('characterStatScreen')
const nameInput = document.getElementById('nameInput')
const statScreenMessage = document.getElementById('statScreenMessage')
const characterStatConfirmBtn = document.getElementById('confirmStats')
const characterStatBackBtn = document.getElementById('leaveStats')
const statAdjustCol = document.getElementById('adjustColumn')
const genericModal = document.getElementById('genericModal')
const genericModalTextEl = document.getElementById('genericModalText')
const closeGenericModalBtn = document.getElementById('closeGenericModal')
const cutsceneContainer = document.getElementById('cutscene')
const endCutsceneBtn = document.getElementById('endCutscene')
const battleScreen = document.getElementById('battleScreen')

//ALL OTHER VARIABLES
let musicRepeatInterval = null
let playerCanChangeStats = true
let currentScreen = null
let nextScreen = startScreen
let isPlayerLevelingUp = false

//
//
//
//CLASSES AND OBJECTS
//
//
//

class Gladiator {
    constructor(name, strength, attack, defense, vitality, stamina, charisma, statPoints) {
        this.name = name
        this.strength = strength
        this.attack = attack
        this.defense = defense
        this.vitality = vitality
        this.stamina = stamina
        this.charisma = charisma
        this.statPoints = statPoints
    }
}

const playerGladiator = new Gladiator(0,0,0,0,0,0,0,5)
const enemyGladiator = new Gladiator(0,0,0,0,0,0,0,0)

//
//
//
//FUNCTIONS
//
//
//

//Got this one from stackoverflow and modified it: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
const unfade = (element, fadeSpeed) => {
    let op = 0.1;  // initial opacity
    element.style.display = 'flex'
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer)
        }
        element.style.opacity = op
        op += op * 0.1
    }, fadeSpeed)
}

// const fade = (element, fadeSpeed) => {
//     let op = 1  // initial opacity
//     let timer = setInterval(function () {
//         if (op >= 1){
//             clearInterval(timer)
//             element.style.display = 'none'
//         }
//         element.style.opacity = op
//         op -= op * 0.1
//     }, fadeSpeed)
// }

const playSound = (sound) => {
    if(sound==simpleClick) {sound.currentTime = 0}
    sound.play()
}

const renderStats = () => {
    statLists.forEach(span => {
        stat = span.getAttribute('stat')
        span.textContent = playerGladiator[stat]
    })
}

const toggleScreen = (fadeType) => {
    if(fadeType === 'none') {
        if(currentScreen != null) {currentScreen.style.display = 'none'}
        nextScreen.style.display = 'flex'
    } else if(fadeType === 'fadeIn') {
        if(currentScreen != null) {currentScreen.style.display = 'none'}
        unfade(nextScreen, 100)
    } // else if(fadeType === 'fadeOut') {
    // NOT CURRENTLY USING FADE OUT
    // }
    currentScreen = nextScreen
}

const displayGenericModal = (modalText) => {
    genericModalTextEl.innerText = modalText
    genericModal.style.display = 'flex'
}

const renderCutscene = (postCutsceneScreen) => {
    nextScreen = postCutsceneScreen
    let element = 0
    while (element < cutsceneElements.length) {
        // setTimeout(() => {
        //     unfade(cutsceneElements[element], 50)
        // }, 5000)
        setTimeout(unfade(cutsceneElements[element], 50), 5000)
        element += 1
    }
}

//
//
//
//EVENT LISTENERS
//
//
//

allButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        playSound(simpleClick)
    })
})

loadBtn.addEventListener('click', (event) => {
    loadBtn.style.display = 'none'
    musicRepeatInterval = setInterval(() =>{
        playSound(startMusic)
    ,180000})
    nextScreen = startScreen
    toggleScreen('fadeIn')
})

howToPlayBtn.addEventListener('click', (event) => {
    howToPlayModal.style.display = 'flex'
})

closeHowToPlayBtn.addEventListener('click', (event) => {
    howToPlayModal.style.display = 'none'
})

assetsBtn.addEventListener('click', (event) => {
    displayGenericModal(
    `Music:

    https://uppbeat.io/t/kevin-macleod/aftermath
    License code: KGCJNYBZFDIQRVXL

    https://uppbeat.io/t/kevin-macleod/anxiety
    License code: BDYZNJGXFRQUHVIC

    https://uppbeat.io/t/monument-music/stop-war
    License code: NVPQ8DC1OD5OBEJU

    https://uppbeat.io/t/ra/coming-after-you
    License code: HLSXPKWE6SKAW2VI

    https://uppbeat.io/t/cory-alstad/a-starless-night
    License code: QALBW1UNUAMWRG7F`
    )
})

startGameBtn.addEventListener('click', (event) => {
    if(nameInput.value != '') {
        playerGladiator.name = nameInput.value
    } else {
        playerGladiator.name = 'Nameless One'
    }
    playerNameSpan.forEach(span => {
        span.textContent = playerGladiator.name
    })
    nextScreen = characterStatScreen
    toggleScreen('none')
})

allStatDecrementers.forEach(button => {
    button.addEventListener('click', (event) => {
        stat = button.getAttribute('stat')
        if(playerGladiator[stat] > 0  && playerCanChangeStats === true) {
            playerGladiator[stat] -= 1
            playerGladiator.statPoints += 1
            renderStats()
        }
    })
})

allStatIncrementers.forEach(button => {
    button.addEventListener('click', (event) => {
        stat = button.getAttribute('stat')
        if(playerGladiator.statPoints > 0 && playerCanChangeStats === true) {
            playerGladiator[stat] += 1
            playerGladiator.statPoints -= 1
            renderStats()
        }
    })
})

characterStatConfirmBtn.addEventListener('click', (event) => {
    if(playerGladiator.statPoints === 0 && isPlayerLevelingUp === false) {
        playerCanChangeStats = false
        startMusic.pause()
        clearInterval(musicRepeatInterval)
        nextScreen = cutsceneContainer
        toggleScreen('none')
        renderCutscene(battleScreen)
    } else if(playerGladiator.statPoints === 0 && isPlayerLevelingUp === true) {
        //do different stuff when player is leveling up mid-game after a level-up
    } else {displayGenericModal('You must allocate all stat points before proceeding.')}
})

characterStatBackBtn.addEventListener('click', (event) => {
    nextScreen = startScreen
    toggleScreen('none')
})

closeGenericModalBtn.addEventListener('click', (event) => {
    genericModal.style.display = 'none'
})