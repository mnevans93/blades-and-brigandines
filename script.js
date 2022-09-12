//GLOBAL VARIABLES

const allButtons = document.querySelectorAll('button')
const loadBtn = document.getElementById('loadButton')
const simpleClick = new Audio('Audio/simpleClick.wav')
const startScreen = document.getElementById('startScreen')
const startMusic = new Audio('Audio/wardrums.wav')
const startGameBtn = document.getElementById('startGame')
const howToPlayBtn = document.getElementById('howToPlay')
const howToPlayModal = document.getElementById('howToPlayModal')
const closeHowToPlayBtn = document.getElementById('closeHowToPlay')
const characterStatScreen = document.getElementById('characterStatScreen')
const nameInput = document.getElementById('nameInput')
const playerNameSpan = document.querySelectorAll('.playerNameSpan')
const allStatDecrementers = document.querySelectorAll('.statDecrementers')
const allStatIncrementers = document.querySelectorAll('.statIncrementers')
const statLists = document.querySelectorAll('.statList')
const characterStatConfirmBtn = document.getElementById('confirmStats')
const statAdjustCol = document.getElementById('adjustColumn')
const genericModal = document.getElementById('genericModal')
const genericModalTextEl = document.getElementById('genericModalText')
const closeGenericModalBtn = document.getElementById('closeGenericModal')

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
let musicRepeatInterval = null
let playerCanChangeStats = true

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
    element.style.display = 'flex';
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += op * 0.1;
    }, fadeSpeed);
}

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

const displayGenericModal = (modalText) => {
    genericModalTextEl.innerText = modalText
    genericModal.style.display = 'flex'
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
    ,40000})
    unfade(startScreen, 100)
})

howToPlayBtn.addEventListener('click', (event) => {
    howToPlayModal.style.display = 'flex'
})

closeHowToPlayBtn.addEventListener('click', (event) => {
    howToPlayModal.style.display = 'none'
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
    startScreen.style.display = 'none'
    characterStatScreen.style.display = 'flex'
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
    if(playerGladiator.statPoints === 0) {
        playerCanChangeStats = false
        characterStatConfirmBtn.style.display = 'none'
    //REPLACE THE ALERT WITH A MODAL OR SOMETHING
    } else {displayGenericModal('You must allocate all stat points before proceeding.')}
})

closeGenericModalBtn.addEventListener('click', (event) => {
    genericModal.style.display = 'none'
})