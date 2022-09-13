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
const cutsceneElements = document.querySelectorAll('.cutsceneEl')

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
    constructor(name=0, strength=0, attack=0, defense=0, vitality=0, stamina=0, charisma=0, statPoints=5) {
        this.name = name
        this.strength = strength
        this.attack = attack
        this.defense = defense
        this.vitality = vitality
        this.stamina = stamina
        this.charisma = charisma
        this.statPoints = statPoints
    }

    incrementStat = (stat) => {
        if(this.statPoints > 0 && playerCanChangeStats === true) {
            this[stat] += 1
            this.statPoints -= 1
            renderStats()
        }
    }

    decrementStat = (stat) => {
        if(this[stat] > 0  && playerCanChangeStats === true) {
            this[stat] -= 1
            this.statPoints += 1
            renderStats()
        }
    }

}

class Cutscene {
    constructor(firstElText, secondElText, thirdElText, fourthElText, buttonText) {
        this.cutsceneText = [firstElText, secondElText, thirdElText, fourthElText, buttonText]
    }

    fillCutsceneText = () => {
        for (let index = 0; index < cutsceneElements.length; index++) {
            cutsceneElements[index].textContent = this.cutsceneText[index]
        }
    }
}

const playerGladiator = new Gladiator()
const enemyGladiator = new Gladiator()
const firstCutscene = new Cutscene(
    firstElText = 'Your heart pounds in your chest as you approach the gate to the arena grounds. You hear the murmurs of the barely interested crowd.',
    secondElText = 'Your hand firmly grips a rusty, pathetic excuse for a weapon, hardly worthy of one who would call themselves a gladiator.',
    thirdElText = 'However, this is an opportunity that will likely never present itself again. This is your chance to make a name for yourself; the start of your story.',
    fourthElText = 'Rising, the gate groans and scrapes and squeals, and the sudden rush of anticipation from the crowd washes over you. There is only one path in front of you now.',
    buttonText = `IT'S TIME TO FIGHT.`
)

//
//
//
//FUNCTIONS
//
//
//


//Got this one from my software engineer friend and now my brain hurts, but I think I understand callback hell
const delay = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, time)
    })
}

//Got this one from stackoverflow and modified it: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
const unfade = (element, fadeSpeed) => {
    let op = 0.1;  // initial opacity
    if(element.tagName === 'DIV') {
        element.style.display = 'flex'
    } else {
        element.style.display = 'block'
    }
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

//Promise chains make my brain hurt
const renderCutscene = (cutscene, postCutsceneScreen) => {
    cutsceneMusic.play()
    cutscene.fillCutsceneText()
    nextScreen = postCutsceneScreen
    let promise = Promise.resolve()
    for (const element of cutsceneElements) {
        promise = promise
            .then(() => delay(3000))
            .then(() => {
                unfade(element, 50)
                return delay(2000)
            })
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
        playerGladiator.decrementStat(button.getAttribute('stat'))
    })
})

allStatIncrementers.forEach(button => {
    button.addEventListener('click', (event) => {
        playerGladiator.incrementStat(button.getAttribute('stat'))
    })
})

characterStatConfirmBtn.addEventListener('click', (event) => {
    if(playerGladiator.statPoints === 0 && isPlayerLevelingUp === false) {
        playerCanChangeStats = false
        startMusic.pause()
        clearInterval(musicRepeatInterval)
        nextScreen = cutsceneContainer
        toggleScreen('none')
        renderCutscene(firstCutscene, battleScreen)
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

endCutsceneBtn.addEventListener('click', (event) => {
    toggleScreen('none')
    cutsceneMusic.currentTime = 0
    cutsceneMusic.pause()
})