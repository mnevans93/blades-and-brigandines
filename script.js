//GLOBAL VARIABLES

//AUDIO FILE VARIABLES
const simpleClick = new Audio('Audio/simpleClick.wav')
const startMusic = new Audio('Audio/aftermath.mp3')
startMusic.loop = true
const cutsceneMusic = new Audio('Audio/anxiety.mp3')
cutsceneMusic.loop = true
const battleMusic = new Audio('Audio/stopWar.mp3')
battleMusic.volume = 0.25
battleMusic.loop = true

//QUERY SELECTOR ALL VARIABLES
const allButtons = document.querySelectorAll('button')
const playerNameSpan = document.querySelectorAll('.playerNameSpan')
const allStatDecrementers = document.querySelectorAll('.statDecrementers')
const allStatIncrementers = document.querySelectorAll('.statIncrementers')
const statLists = document.querySelectorAll('.statList')
const cutsceneElements = document.querySelectorAll('.cutsceneEl')
const allActionBtns = document.querySelectorAll('.action')

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
const battleMessages = document.getElementById('battleMessages')

//ALL OTHER VARIABLES
let musicRepeatInterval = null
let playerCanChangeStats = true
let currentScreen = null
let nextScreen = startScreen
let isPlayerLevelingUp = false
let activeCutscene = null

//
//
//
//CLASSES AND OBJECTS
//
//
//

class Cutscene {
    constructor(firstElText, secondElText, thirdElText, fourthElText, buttonText, postCutsceneScreen, postCutsceneMusic, postCutsceneMusicInterval) {
        this.cutsceneText = [firstElText, secondElText, thirdElText, fourthElText, buttonText]
        this.postCutsceneScreen = postCutsceneScreen
        this.postCutsceneMusic = postCutsceneMusic
        this.postCutsceneMusicInterval = postCutsceneMusicInterval
    }

    fillCutsceneText = () => {
        for (let index = 0; index < cutsceneElements.length; index++) {
            cutsceneElements[index].textContent = this.cutsceneText[index]
        }
    }
}

const cutscenes = [
    introCutscene = new Cutscene(
        firstElText = 'Your heart pounds in your chest as you approach the gate to the arena grounds. You hear the murmurs of the barely interested crowd.',
        secondElText = 'Your sweaty palm firmly grips a rusty, pathetic excuse for a weapon, hardly worthy of one who would call themselves a gladiator...',
        thirdElText = '...but however insignificant this battle may be to the spectators, this is your chance to begin making a name for yourself; the start of your story.',
        fourthElText = 'Rising, the gate groans and scrapes and squeals, and the rush of light from the arena sands washes over you. There is only one path in front of you now.',
        buttonText = `IT'S TIME TO FIGHT.`,
        postCutsceneScreen = battleScreen,
        postCutsceneMusic = battleMusic,
        postCutsceneMusicInterval = 75000
    )
]

class Equipment {
    constructor(itemName, description, price, purchased, equipped) {
        this.itemName = itemName
        this.description = description
        this.price = price
        this.purchased = purchased
        this.equipped = equipped
    }

    buyEquipment() {
        //check if player has enough gold to add item to their inventory
            //call generic modal if they do not have enough gold and return
        //else subtract price from player's gold, set purchased to true so it can show 
        //give player option to equip after purchasing or prompt to equip in inventory
    }
}

class Weapon extends Equipment {
    constructor(itemName, description, price, purchased, equipped, minDamage, maxDamage) {
        super(itemName, description, price, purchased, equipped)
        this.minDamage = minDamage
        this.maxDamage = maxDamage
    }

    equipWeapon() {
        //set player's equipped weapon to this one and equipped = true, unequip the old one and equipped = false
    }
}

const allWeapons = [
    rustyBlade = new Weapon('Rusty Blade', `Not much of a weapon, but it'll have to do for now.`, 0, true, true, 0, 5),
    serratedKnife = new Weapon('Serrated Knife', `Sharper than what you started with, but... isn't this just a steak knife?`, 100, false, false, 5, 10),
    shortsword = new Weapon('Shortsword', `Finally, a real weapon.`, 250, false, false, 10, 20),
    longsword = new Weapon('Longsword', `This blade has some real heft to it. This will do nicely...`, 1000, false, false, 20, 35),
    broadsword = new Weapon('Broadsword', `Deadly sharp, easy to handle. Your enemies won't know what cut them.`, 2500, false, false, 35, 50)
] 

class Armor extends Equipment {
    constructor(itemName, description, price, purchased, equipped, armorBonus) {
        super(itemName, description, price, purchased, equipped)
        this.armorBonus = armorBonus
    }

    equipArmor() {
        //set player's equipped armor to this one and equipped = true, unequip the old one and equipped = false
    }
}

const allArmor = [
    plainClothing = new Armor('Plain Clothing', `Doesn't protect you at all. It's pretty cut up already, too...`, 0, true, true, 0),
    hideArmor = new Armor('Hide Armor', `Stitched together hides that only cover major vital points. Better than nothing.`, 250, false, false, 25),
    paddedArmor = new Armor('Padded Armor', `Covers just about everything important, but it's not terribly sturdy.`, 1000, false, false, 50),
    leatherArmor = new Armor('Leather Armor', `Well-fitted and fairly durable. This might just keep you alive.`, 2500, false, false, 100),
    brigandine = new Armor('Brigandine', `This looks very well-made. Very sturdy, too. It should turn quite a few blades.`, 5000, false, false, 200)
]

class Gladiator {
    constructor(name=0, level=1, statPoints=5, strength=0, attack=0, defense=0, vitality=0, stamina=0, charisma=0, experience=0, gold=0, defeatedOpponents=0) {
        this.name = name
        this.level = level
        this.statPoints = statPoints
        this.strength = strength
        this.attack = attack
        this.defense = defense
        this.vitality = vitality
        this.stamina = stamina
        this.charisma = charisma
        this.experience = experience
        this.gold = gold
        this.defeatedOpponents = defeatedOpponents
    }

    equippedItems = [
        this.weapon = rustyBlade,
        this.armor = plainClothing
    ]

    incrementStat(stat) {
        if(this.statPoints > 0 && playerCanChangeStats === true) {
            this[stat] += 1
            this.statPoints -= 1
            renderStats()
        }
    }

    decrementStat(stat) {
        if(this[stat] > 0  && playerCanChangeStats === true) {
            this[stat] -= 1
            this.statPoints += 1
            renderStats()
        }
    }

    makeAttack(target, attackType) {
        
    }

    taunt(target) {
        
    }

    winTheCrowd() {
        
    }

    rest() {
        
    }

    generateBattleMessage(actionType, succeeded) {

    }

    enemyAction() {

    }
}

const playerGladiator = new Gladiator()
const enemyGladiator = new Gladiator()

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
    if (element.tagName === 'DIV') {
        element.style.display = 'flex'
    } else {
        element.style.display = 'block'
    }
    let timer = setInterval(function () {
        if (op >= 1) {
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
    if (sound === simpleClick) {sound.currentTime = 0}
    sound.play()
}

const pauseSound = (sound) => {
    sound.currentTime = 0
    sound.pause()
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
const renderCutscene = (cutscene) => {
    activeCutscene = cutscene
    playSound(cutsceneMusic)
    cutscene.fillCutsceneText()
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

const startBattle = () => {
    playSound(battleMusic)
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
    playSound(startMusic)
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
        pauseSound(startMusic)
        nextScreen = cutsceneContainer
        toggleScreen('none')
        renderCutscene(introCutscene)
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
    pauseSound(cutsceneMusic)
    playSound(activeCutscene.postCutsceneMusic)
    nextScreen = activeCutscene.postCutsceneScreen
    toggleScreen('none')
})

allActionBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        let buttonID = button.getAttribute('id')
        if (buttonID === 'light' || buttonID === 'medium' || buttonID === 'heavy') {
            playerGladiator.makeAttack(enemyGladiator, buttonID)
        } else if (buttonID === 'taunt') {
            playerGladiator.taunt(enemyGladiator)
        } else {
            playerGladiator[buttonID]()
        }
    })
})