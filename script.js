//GLOBAL VARIABLES

//AUDIO FILE VARIABLES
const simpleClick = new Audio('Audio/simpleClick.wav')
const startMusic = new Audio('Audio/aftermath.mp3')
startMusic.loop = true
const cutsceneMusic = new Audio('Audio/anxiety.mp3')
cutsceneMusic.loop = true
const battleMusic = new Audio('Audio/stopWar.mp3')
battleMusic.volume = 0.15
battleMusic.loop = true

//QUERY SELECTOR ALL VARIABLES
const allButtons = document.querySelectorAll('button')
const playerNameSpan = document.querySelectorAll('.playerNameSpan')
const allStatDecrementers = document.querySelectorAll('.statDecrementers')
const allStatIncrementers = document.querySelectorAll('.statIncrementers')
const statLists = document.querySelectorAll('.statList')
const cutsceneElements = document.querySelectorAll('.cutsceneEl')
const allActionBtns = document.querySelectorAll('.action')
const enemyStats = document.querySelectorAll('.enemyStat')

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
const crowdBar = document.getElementById('crowd')

//ALL OTHER VARIABLES
let musicRepeatInterval = null
let playerCanChangeStats = true
let currentScreen = null
let nextScreen = startScreen
let isPlayerLevelingUp = false
let activeCutscene = null
let crowdBarPercentage = 0.1

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
        postCutsceneMusicInterval = 75000,
        postCutsceneBattle = true
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
    rustyBlade = new Weapon('Rusty Blade', `Not much of a weapon, but it'll have to do for now.`, 0, true, true, 1, 5),
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
    constructor(gladiatorName=0, level=1, health=20, maxHealth=20, energy=50, maxEnergy=50, armorRemaining=0, maxArmor=0, statPoints=5, strength=0, attack=0, defense=0, vitality=0, stamina=0, charisma=0, experience=0, gold=0, defeatedOpponents=0) {
        this.gladiatorName = gladiatorName
        this.level = level
        this.health = health
        this.maxHealth = maxHealth
        this.energy = energy
        this.maxEnergy = maxEnergy
        this.armorRemaining = armorRemaining
        this.maxArmor = maxArmor
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

    increaseStat(stat) {
        if(this.statPoints > 0 && playerCanChangeStats === true) {
            this[stat] += 1
            this.statPoints -= 1
            renderStats()
        }
    }

    decreaseStat(stat) {
        if(this[stat] > 0  && playerCanChangeStats === true) {
            this[stat] -= 1
            this.statPoints += 1
            renderStats()
        }
    }

    adjustSecondaryStats() {
        this.maxHealth = (20 + 4 * this.vitality) * this.level
        this.maxEnergy = (50 + 10 * this.stamina) * this.level
        this.health = this.maxHealth
        this.energy = this.maxEnergy
    }

    levelUp() {
        isPlayerLevelingUp = true
        level += 1
        //not finished
    }

    makeAttack(target, attackType) {
        if (this.checkEnergy() === false) {return}
        this.energy -= this.calcEnergy(attackType)
        this.calcCrowd(attackType)
        let hitChance = this.calcAccuracy(attackType, target.defense)
        if (Math.random() <= hitChance) {
            let damage = this.calcDamage(attackType) * this.checkIfCritical(attackType)
            //not finished
        }
        renderStats()
    }

    checkEnergy() {
        if (this.energy <= 0) {
            displayGenericModal('You do not have the energy to perform this action.')
            return false
        }
        return true
    }

    calcEnergy(attackType) {
        if (attackType === 'light') {
            return 10 + 2 * this.strength
        } else if (attackType === 'medium') {
            return 25 + 5 * this.strength
        } else {
            return 40 + 8 * this.strength
        }
    }

    calcAccuracy(action, targetStat) {
        let statDelta = null
        let calcAccuracy = null

        if (action === 'light' || action === 'medium' || action === 'heavy') {
            statDelta = this.attack - targetStat
        } else if (action === 'taunt') {
            statDelta = this.charisma - targetStat
            calcAccuracy = 0.5 + statDelta * 0.05
            if (calcAccuracy < 0.2) {calcAccuracy = 0.2}
        }

        if (action === 'light') {
            calcAccuracy = 0.75 + statDelta * 0.1
            if (calcAccuracy < 0.33) {calcAccuracy = 0.33}
            
        } else if (action === 'medium') {
            calcAccuracy = 0.5 + statDelta * 0.05
            if (calcAccuracy < 0.2) {calcAccuracy = 0.2}
        } else if (action === 'heavy') {
            calcAccuracy = 0.25 + statDelta * 0.025
            if (calcAccuracy < 0.1) {calcAccuracy = 0.1}
        }
        return calcAccuracy
    }

    checkIfCritical(attackType) {
        if (attackType === 'light') {
            if (Math.random() < 0.05) {return 2}
        } else if (attackType === 'medium') {
            if (Math.random() < 0.10) {return 2}
        } else if (attackType === 'heavy') {
            if (Math.random() < 0.20) {return 2}
        }
        return 1
    }

    calcDamage(attackType) {

    }

    calcCrowd(action) {
        if (action === 'winTheCrowd') {
            crowdBarPercentage += 0.1 + this.charisma * 0.05
        } else if (action === 'taunt') {
            crowdBarPercentage += 0.01 + this.charisma * 0.01
        } else if (action === 'light') {
            crowdBarPercentage += 0.025
        } else if (action === 'medium') {
            crowdBarPercentage += 0.05
        } else if (action === 'heavy') {
            crowdBarPercentage += 0.1
        } else if (action === 'rest') {
            crowdBarPercentage -= 0.05
        }
        if (crowdBarPercentage > 1) {crowdBarPercentage = 1}
        if (crowdBarPercentage < 0) {crowdBarPercentage = 0}
        crowdBar.style.width = `${crowdBarPercentage * 100}%`
    }

    checkHealth() {

    }

    taunt(target) {
        
    }

    winTheCrowd() {
        if (this.checkEnergy() === false) {return}
        this.energy -= 10
        this.calcCrowd('winTheCrowd')
        renderStats()
    }

    rest() {
        if (this.energy === this.maxEnergy) {
            displayGenericModal('Your energy is already full.')
            return
        }
        this.energy += this.maxEnergy * 0.5
        if (this.energy > this.maxEnergy) {this.energy = this.maxEnergy}
        this.calcCrowd('rest')
        renderStats()
    }

    generateBattleMessage(actionType, succeeded) {

    }

    enemyAction() {

    }
}

const playerGladiator = new Gladiator()
const enemyGladiator = new Gladiator('New Blood')

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

function playSound(sound) {
    if (sound === simpleClick) { sound.currentTime = 0} 
    sound.play()
}

function pauseSound(sound) {
    sound.currentTime = 0
    sound.pause()
}

function renderStats() {
    statLists.forEach(span => {
        stat = span.getAttribute('stat')
        span.textContent = playerGladiator[stat]
    })
    enemyStats.forEach(span => {
        stat = span.getAttribute('stat')
        span.textContent = enemyGladiator[stat]
    })
}

function toggleScreen(fadeType) {
    if (fadeType === 'none') {
        if (currentScreen != null) { currentScreen.style.display = 'none'} 
        nextScreen.style.display = 'flex'
    } else if (fadeType === 'fadeIn') {
        if (currentScreen != null) { currentScreen.style.display = 'none'} 
        unfade(nextScreen, 100)
    } // else if(fadeType === 'fadeOut') {
    // NOT CURRENTLY USING FADE OUT
    // }
    currentScreen = nextScreen
}

function displayGenericModal(modalText) {
    genericModalTextEl.innerText = modalText
    genericModal.style.display = 'flex'
}

function renderCutscene(cutscene) {
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

function startBattle() {
    playSound(battleMusic)
    renderStats()
    crowdBar.style.width = `${crowdBarPercentage * 100}%`
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
        playerGladiator.gladiatorName = nameInput.value
    } else {
        playerGladiator.gladiatorName = 'Nameless One'
    }
    playerNameSpan.forEach(span => {
        span.textContent = playerGladiator.gladiatorName
    })
    nextScreen = characterStatScreen
    toggleScreen('none')
})

allStatDecrementers.forEach(button => {
    button.addEventListener('click', (event) => {
        playerGladiator.decreaseStat(button.getAttribute('stat'))
    })
})

allStatIncrementers.forEach(button => {
    button.addEventListener('click', (event) => {
        playerGladiator.increaseStat(button.getAttribute('stat'))
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
    playerGladiator.adjustSecondaryStats()
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
    if (postCutsceneBattle === true) {startBattle()}
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