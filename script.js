//GLOBAL VARIABLES
const loadBtn = document.getElementById('loadButton')
const startScreen = document.getElementById('startScreen')
const startMusic = new Audio('Audio/wardrums.wav')
const startGameBtn = document.getElementById('startGame')
const howToPlayBtn = document.getElementById('howToPlay')

//CLASSES AND OBJECTS

//FUNCTIONS
//Got this one from stackoverflow: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
function unfade(element) {
    let op = 0.1;  // initial opacity
    element.style.display = 'flex';
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += op * 0.1;
    }, 85);
}

//EVENT LISTENERS
loadBtn.addEventListener('click', (event) => {
    loadBtn.style.display = 'none'
    startMusic.play()
    unfade(startScreen)
})