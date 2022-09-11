//GLOBAL VARIABLES
const loadBtn = document.getElementById('loadButton')
const startScreen = document.getElementById('startScreen')
const startMusic = new Audio('Audio/wardrums.wav')
const startGameBtn = document.getElementById('startGame')
const howToPlayBtn = document.getElementById('howToPlay')
const howToPlayModal = document.getElementById('howToPlayModal')
const closeHowToPlayBtn = document.getElementById('closeHowToPlay')

//CLASSES AND OBJECTS

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

function fade(element, fadeSpeed) {
    let op = 1;  // initial opacity
    let timer = setInterval(function () {
        if (op <= 0){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        op -= op * 0.1;
    }, fadeSpeed);
}

//EVENT LISTENERS
loadBtn.addEventListener('click', (event) => {
    loadBtn.style.display = 'none'
    startMusic.play()
    unfade(startScreen, 100)
})

howToPlayBtn.addEventListener('click', (event) => {
    howToPlayModal.style.display = 'flex'
    unfade(howToPlayModal, 65)
})

closeHowToPlayBtn.addEventListener('click', (event) => {
    fade(howToPlayModal, 35)
})