//GLOBAL VARIABLES
const loadBtn = document.getElementById('loadButton')
const simpleClick = new Audio('Audio/simpleClick.wav')
const startScreen = document.getElementById('startScreen')
const startMusic = new Audio('Audio/wardrums.wav')
const startGameBtn = document.getElementById('startGame')
const howToPlayBtn = document.getElementById('howToPlay')
const howToPlayModal = document.getElementById('howToPlayModal')
const closeHowToPlayBtn = document.getElementById('closeHowToPlay')
const characterCreationScreen = document.getElementById('characterCreationScreen')
const nameInput = document.getElementById('nameInput')
const allButtons = document.querySelectorAll('button')

//CLASSES AND OBJECTS
class Gladiator {
    constructor(name, strength, attack, defense, vitality, stamina, charisma) {
        this.name = name
        this.strength = strength
        this.attack = attack
        this.defense = defense
        this.vitality = vitality
        this.stamina = stamina
        this.charisma = charisma
    }
}

const playerGladiator = new Gladiator()
let musicRepeatInterval = null

//FUNCTIONS
//Got this one from stackoverflow and modified it: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
function unfade(element, fadeSpeed) {
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

function playSound(sound) {
    sound.play()
}

//EVENT LISTENERS
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
    startScreen.style.display = 'none'
    characterCreationScreen.style.display = 'flex'
})