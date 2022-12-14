//GLOBAL VARIABLES

//AUDIO FILE VARIABLES
const simpleClick = new Audio('Audio/simpleClick.wav')
const startMusic = new Audio('Audio/aftermath.mp3')
startMusic.loop = true
const cutsceneMusic = new Audio('Audio/anxiety.mp3')
cutsceneMusic.loop = true
const battleMusic = new Audio('Audio/stopWar.mp3')
battleMusic.volume = 0.175
battleMusic.loop = true
const townMusic = new Audio('Audio/aStarlessNight.mp3')
townMusic.volume = 0.75
townMusic.loop = true

//QUERY SELECTOR ALL VARIABLES
const allButtons = document.querySelectorAll('button')
const playerNameSpan = document.querySelectorAll('.playerNameSpan')
const allStatDecrementers = document.querySelectorAll('.statDecrementers')
const allStatIncrementers = document.querySelectorAll('.statIncrementers')
const statLists = document.querySelectorAll('.statList')
const cutsceneElements = document.querySelectorAll('.cutsceneEl')
const allActionBtns = document.querySelectorAll('.action')
const enemyStats = document.querySelectorAll('.enemyStat')
const townOpenBtns = document.querySelectorAll('.buildingOpen')
const townCloseBtns = document.querySelectorAll('.buildingClose')
const startBattleBtns = document.querySelectorAll('.battle')

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
const cutsceneContainer = document.getElementById('cutscene')
const endCutsceneBtn = document.getElementById('endCutscene')
const battleScreen = document.getElementById('battleScreen')
const battleMessagesEl = document.getElementById('battleMessages')
const battleRoundEl = document.getElementById('battleRound')
const crowdBar = document.getElementById('crowd')
const playerActions = document.getElementById('playerActionsContainer')
const leaveBattleBtn = document.getElementById('leaveBattle')
const townScreen = document.getElementById('townScreen')
const buildingsContainer = document.getElementById('buildingsContainer')
const enterArenaScreen = document.getElementById('arenaInterface')
const enterInnScreen = document.getElementById('innInterface')
const openInventoryBtn = document.getElementById('openInventory')
const openOverviewBtn = document.getElementById('openCharOverview')
const weaponsmithScreen = document.getElementById('weaponsmithInterface')
const weaponsmithTextEl = document.getElementById('weaponsmithText')
const armorerScreen = document.getElementById('armorerInterface')
const armorerTextEl = document.getElementById('armorerText')

//ALL OTHER VARIABLES
let musicRepeatInterval = null
let currentScreen = null
let nextScreen = startScreen
let isPlayerLevelingUp = false
let easyDismissGlobal = true
let activeCutscene = null
let crowdBarPercentage = 0.1
let battleRound = 1
let enemyTurn = false
let leaveBattleBtnBehavior = null
let storyPhase = 0
let townInterfaceOpen = false

//
//
//
//CLASSES AND OBJECTS
//
//
//

class Background {
    constructor(imgURL, displayStyle) {
        this.imgURL = imgURL
        this.displayStyle = displayStyle
    }
}

const backgrounds = [
    mainBG = new Background(`var(--game-background-image)`, 'auto'),
    outsideArenaBG = new Background(`var(--arena-outside-image)`, 'cover'),
    arenaBG = new Background(`var(--arena-background-image)`, 'cover'),
    townBG = new Background(`var(--town-background-image)`, 'cover')
]

class Cutscene {
    constructor(firstElText, secondElText, thirdElText, fourthElText, buttonText, postCutsceneScreen, postCutsceneMusic, postCutsceneBattle) {
        this.cutsceneText = [firstElText, secondElText, thirdElText, fourthElText, buttonText]
        this.postCutsceneScreen = postCutsceneScreen
        this.postCutsceneMusic = postCutsceneMusic
        this.postCutsceneBattle = postCutsceneBattle
    }

    renderCutscene() {
        activeCutscene = this
        playSound(cutsceneMusic)
        this.resetCutscene()
        this.fillCutsceneText()
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

    resetCutscene() {
        for (const element of cutsceneElements) {
            element.style.opacity = 0
        }
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
        postCutsceneBattle = true
    ),

    firstFightDoneCutscene = new Cutscene(
        firstElText = `Your heartbeat begins to slow as your opponent's stops. The battle is done. You steady yourself, trying to catch your breath.`,
        secondElText = `You straighten your posture and strap your weapon to your waist before looking around at the crowd.`,
        thirdElText = `You count no more than a few dozen spectators. A paltry attendance, but you expected nothing more.`,
        fourthElText = `Before long, these seats will be full of people chanting your name. You resolve to make this a reality, no matter what it takes.`,
        buttonText = `A journey of a thousand miles begins with a single step.`,
        postCutsceneScreen = townScreen,
        postCutsceneMusic = townMusic,
        postCutsceneBattle = false
    ),

    playerLosesCutscene = new Cutscene(
        firstElText = `You try to stay standing, but it's useless as your legs fail you. You feel your body begin to fold under your own weight.`,
        secondElText = `The world swirls around you, your vision blurring and before long, you realize you are lying face down in the sand.`,
        thirdElText = `This wasn't how it was supposed to go. You feel anger and regret surge through you as you lose physical sensation.`,
        fourthElText = `Your story should not have ended here. You still had so far left to go. Maybe things will be different in the next life...`,
        buttonText = `The arena claims another...`,
        postCutsceneScreen = startScreen,
        postCutsceneMusic = startMusic,
        postCutsceneBattle = false
    )
]

class BattleMessage {
    constructor(playerSuccessText, playerFailText, enemySuccessText, enemyFailText) {
        this.playerSuccessText = playerSuccessText
        this.playerFailText = playerFailText
        this.enemySuccessText = enemySuccessText
        this.enemyFailText = enemyFailText
    }

    generateBattleMessage(gladiator, result) {
        if (gladiator === playerGladiator && result === 'success') {
            battleMessagesEl.innerText = this.playerSuccessText
        } else if (gladiator === playerGladiator && result === 'fail') {
            battleMessagesEl.innerText = this.playerFailText
        } else if (gladiator === enemyGladiator && result === 'success') {
            battleMessagesEl.innerText = this.enemySuccessText
        } else {battleMessagesEl.innerText = this.enemyFailText}
    }

}

const allBattleMessages = [
    lightAtk = new BattleMessage(
        playerSuccessText = `LIGHT HIT: Your quick jab lands, wounding your opponent.`,
        playerFailText = `LIGHT MISS: You go for a quick strike and are just as quickly deflected.`,
        enemySuccessText = `LIGHT HIT: Your opponent slips between your guard with a quick strike. You wince.`,
        enemyFailText = `LIGHT MISS: You easily parry your opponent's weak excuse for an attack.`,
    ),
    medAtk = new BattleMessage(
        playerSuccessText = `MED HIT: Your strike is well-timed, your opponent stumbling backwards as it connects.`,
        playerFailText = `MED MISS: Your well-balanced strike meets your opponent's blade, stopping short of harm.`,
        enemySuccessText = `MED HIT: You try to block the strike, but your opponent overwhelms you, wounding you.`,
        enemyFailText = `MED MISS: Your blade collides with your opponent's swing as you push them back.`,
    ),
    heavyAtk = new BattleMessage(
        playerSuccessText = `HEAVY HIT: Your mighty swing cleaves into your opponent, grievously injuring them.`,
        playerFailText = `HEAVY MISS: You put all your might into your swing, but your opponent darts out of the way.`,
        enemySuccessText = `HEAVY HIT: Your vision darkens as the vicious swing lands... but you're not dead. Yet.`,
        enemyFailText = `HEAVY MISS: The might behind your opponent's swing meets the sands while you remain unscathed.`,
    ),
    lightAtkCrit = new BattleMessage(
        playerSuccessText = `LIGHT CRITICAL HIT! Your flourish catches your opponent completely off-guard. Blood sprays the sands.`,
        playerFailText = null,
        enemySuccessText = `LIGHT CRITICAL HIT! A careless mistake in your guard makes this quick strike hurt much more than it should have.`,
        enemyFailText = null,
    ),
    medAtkCrit = new BattleMessage(
        playerSuccessText = `MED CRITICAL HIT! Your swing meets flesh and bone, sending your opponent reeling.`,
        playerFailText = null,
        enemySuccessText = `MED CRITICAL HIT! You try to parry the swing, but it is in vain as the blade rips into you.`,
        enemyFailText = null,
    ),
    heavyAtkCrit = new BattleMessage(
        playerSuccessText = `HEAVY CRITICAL HIT! Your opponent feels the full weight of your fury. Somehow, they're still alive.`,
        playerFailText = null,
        enemySuccessText = `HEAVY CRITICAL HIT! A swing that would make the Reaper envious. Miraculously, it didn't kill you.`,
        enemyFailText = null,
    ),
    tauntFailMsg = new BattleMessage(
        playerSuccessText = null,
        playerFailText = `TAUNT FAILED: You attempt to get a rise out of your opponent, but they don't take the bait.`,
        enemySuccessText = null,
        enemyFailText = `TAUNT FAILED: Your opponent makes a poor attempt at taunting you, and you simply ignore it.`,
    ),
    tauntCounterMsg = new BattleMessage(
        playerSuccessText = `COUNTERED: You goad your opponent into attacking before skillfully countering them.`,
        playerFailText = null,
        enemySuccessText = `COUNTERED: Your opponent taunts and baits you into a well-timed counter.`,
        enemyFailText = null,
    ),
    tauntExhaustedMsg = new BattleMessage(
        playerSuccessText = `EXHAUSTED: You unleash a rapid series of feints that tires out your opponent as they dodge imaginary strikes.`,
        playerFailText = null,
        enemySuccessText = `EXHAUSTED: Your opponent makes a flurry of quick attacks that never quite connect, exhausting you as you dodge them.`,
        enemyFailText = null,
    ),
    tauntDistractedMsg = new BattleMessage(
        playerSuccessText = `DISTRACTED: You temporarily distract your opponent, opening them up to your next attack...`,
        playerFailText = null,
        enemySuccessText = `DISTRACTED: Your opponent distracts you just enough that you don't see a well-disguised strike coming...`,
        enemyFailText = null,
    ),
    tauntEnragedMsg = new BattleMessage(
        playerSuccessText = `ENRAGED: You rile up your opponent and bait them into swinging wildly.`,
        playerFailText = null,
        enemySuccessText = `ENRAGED: Your opponent draws your ire, and your rage makes you momentarily sloppy.`,
        enemyFailText = null,
    ),
    winTheCrowdMsg = new BattleMessage(
        playerSuccessText = `WIN THE CROWD: You focus on the crowd and flourish dramatically, mostly ignoring your opponent.`,
        playerFailText = null,
        enemySuccessText = `WIN THE CROWD: Your opponent showboats for the crowd while paying you little mind.`,
        enemyFailText = null,
    ),
    restMsg = new BattleMessage(
        playerSuccessText = `REST: You try to keep up your defenses while catching your breath.`,
        playerFailText = null,
        enemySuccessText = `REST: Looking winded, your opponent tries to catch their breath.`,
        enemyFailText = null,
    ),
    battleEndMsg = new BattleMessage(
        playerSuccessText = `With one final strike, your opponent's body slumps to the ground.`,
        playerFailText = `...is this the end?`,
        enemySuccessText = null,
        enemyFailText = null,
    ),
    battleStartMsg = new BattleMessage(
        playerSuccessText = `The crowd looks on with curiosity as you engage your opponent.`,
        playerFailText = null,
        enemySuccessText = null,
        enemyFailText = null,
    )
]

class Debuff {
    constructor(debuffName, debuffMultiplier, expiration) {
        this.debuffName = debuffName
        this.debuffMultiplier = debuffMultiplier
        this.expiration = expiration
    }
}

const allDebuffs = [
    enraged = new Debuff('ENRAGED', 0.5, 1),
    distracted = new Debuff('DISTRACTED', 1.5, 2),
    exhausted = new Debuff('EXHAUSTED', 0.5, 0),
    countered = new Debuff('COUNTERED', null, 0)
]

class Equipment {
    constructor(itemName, description, basePrice, price, purchased, equipped) {
        this.itemName = itemName
        this.description = description
        this.basePrice = basePrice
        this.price = price
        this.purchased = purchased
        this.equipped = equipped
    }

    buyEquipment() {
        if (this.price > playerGladiator.gold) {
            displayGenericModal(`You cannot afford this item. Don't waste my time.`, true, true)
            return false
        } else {
            playerGladiator.gold -= this.price
            this.purchased = true
            displayGenericModal(`You purchased the ${this.itemName}. Visit the Inn to equip it.`, true, true)
            return true
        }
    }

    calcPrice() {
        let discount = 1 - playerGladiator.charisma * 0.05
        this.price = this.basePrice * discount
    }

}

class Weapon extends Equipment {
    constructor(itemName, description, basePrice, price, purchased, equipped, minDamage, maxDamage) {
        super(itemName, description, basePrice, price, purchased, equipped)
        this.minDamage = minDamage
        this.maxDamage = maxDamage
        this.damageRange = maxDamage - minDamage
    }
}

const allWeapons = [
    rustyBlade = new Weapon('Rusty Blade', `Not much of a weapon, but it'll have to do for now.`, 0, 0, true, true, 1, 5),
    serratedKnife = new Weapon('Serrated Knife', `Sharper than what you started with, but... isn't this just a steak knife?`, 100, 100, false, false, 5, 10),
    shortsword = new Weapon('Shortsword', `Finally, a real weapon.`, 250, 250, false, false, 10, 20),
    longsword = new Weapon('Longsword', `This blade has some real heft to it. This will do nicely...`, 1000, 1000, false, false, 20, 35),
    broadsword = new Weapon('Broadsword', `Deadly sharp, easy to handle. Your enemies won't know what cut them.`, 2500, 2500, false, false, 35, 50)
] 

class Armor extends Equipment {
    constructor(itemName, description, basePrice, price, purchased, equipped, armorBonus) {
        super(itemName, description, basePrice, price, purchased, equipped)
        this.armorBonus = armorBonus
    }
}

const allArmor = [
    plainClothing = new Armor('Plain Clothing', `Doesn't protect you at all. It's pretty cut up already, too...`, 0, 0, true, true, 0),
    hideArmor = new Armor('Hide Armor', `Stitched together hides that only cover major vital points. Better than nothing.`, 250, 250, false, false, 25),
    paddedArmor = new Armor('Padded Armor', `Covers just about everything important, but it's not terribly sturdy.`, 1000, 1000, false, false, 50),
    leatherArmor = new Armor('Leather Armor', `Well-fitted and fairly durable. This might just keep you alive.`, 2500, 2500, false, false, 100),
    brigandine = new Armor('Brigandine', `This looks very well-made. Very sturdy, too. It should turn quite a few blades.`, 5000, 5000, false, false, 200)
]

class Gladiator {
    constructor(gladiatorName=0, level=1, health=20, maxHealth=20, energy=50, maxEnergy=50,
        armorRemaining=0, maxArmor=0, debuff='NONE', debuffClear=null, statPoints=5, 
        strength=0, attack=0, defense=0, vitality=0, stamina=0, charisma=0,
        strengthPrev=0, attackPrev=0, defensePrev=0, vitalityPrev=0, staminaPrev=0, charismaPrev=0,
        experience=0, gold=0, defeatedOpponents=0, experienceReward=50, goldReward=50) {
        this.gladiatorName = gladiatorName
        this.level = level
        this.weapon = rustyBlade,
        this.armor = plainClothing
        this.health = health
        this.maxHealth = maxHealth
        this.energy = energy
        this.maxEnergy = maxEnergy
        this.armorRemaining = armorRemaining
        this.maxArmor = maxArmor
        this.debuff = debuff
        this.debuffClear = debuffClear
        this.statPoints = statPoints
        this.strength = strength
        this.attack = attack
        this.defense = defense
        this.vitality = vitality
        this.stamina = stamina
        this.charisma = charisma
        this.strengthPrev = strengthPrev
        this.attackPrev = attackPrev
        this.defensePrev = defensePrev
        this.vitalityPrev = vitalityPrev
        this.staminaPrev = staminaPrev
        this.charismaPrev = charismaPrev
        this.experience = experience
        this.gold = gold
        this.defeatedOpponents = defeatedOpponents
        this.experienceReward = experienceReward
        this.goldReward = goldReward
    }

    levelUps = [
        0, //level 0, not used for player
        200, //level 1, 100 xp for level 2
        700, //level 2, 250 xp for level 3, etc.
        2000, 
        5000,
        0, //no levels after 5 for now
    ]

    enemyGladiatorBasics = [
        ['New Blood', 50, 50], //level 0 enemy gladiator: name, rewards 50 xp, 50 base gold
        ['Greenhorn Gladiator', 75, 100], //level 1 gladiator: name, rewards 75 xp, 100 base gold, etc.
        ['Experienced Gladiator', 100, 200],
        ['Adept Gladiator', 150, 400], 
        ['Veteran Gladiator', 200, 700],
        ['Legendary Gladiator', 250, 1000]
    ]

    enemyGladiatorGear = [
        [rustyBlade, rustyBlade, plainClothing, plainClothing], //level 0 enemy will always have rusty blade and plain clothing
        [rustyBlade, serratedKnife, plainClothing, hideArmor], //level 1 enemy will have rusty blade and plain clothing at a minimum, chance to have knife or hide instead
        [serratedKnife, shortsword, hideArmor, paddedArmor], //level 2 enemy will have knife/hide minimum, chance to have shortsword/padded instead, etc.
        [shortsword, shortsword, paddedArmor, paddedArmor],
        [longsword, longsword, leatherArmor, leatherArmor],
        [longsword, broadsword, leatherArmor, brigandine]
    ]

    increaseStat(stat) {
        if(this.statPoints > 0) {
            this[stat] += 1
            this.statPoints -= 1
            renderStats()
        }
    }

    decreaseStat(stat) {
        // prevStat = `prev${stat}`
        if(this[stat] > this[`${stat}Prev`]) {
            this[stat] -= 1
            this.statPoints += 1
            renderStats()
        }
    }

    adjustSecondaryStats() {
        this.maxHealth = (20 + 4 * this.vitality) * this.level
        this.maxEnergy = (50 + 10 * this.stamina) * this.level
        if (this.maxHealth === 0) {this.maxHealth = 20}
        if (this.maxEnergy === 0) {this.maxEnergy = 50}
        this.maxArmor = this.armor.armorBonus
        this.armorRemaining = this.maxArmor
        this.health = this.maxHealth
        this.energy = this.maxEnergy
        this.strengthPrev = this.strength
        this.attackPrev = this.attack
        this.defensePrev = this.defense
        this.vitalityPrev = this.vitality
        this.staminaPrev = this.stamina
        this.charismaPrev = this.charisma
    }

    getRewards(expReward, goldReward) {
        this.experience += expReward
        this.gold += Math.round((goldReward * (1 + crowdBarPercentage)))
        this.defeatedOpponents += 1
        setTimeout(() => {
            if (this.experience >= this.levelUps[this.level]) {
                displayGenericModal(`You earned ${expReward} experience and ${Math.round(goldReward * (1 + crowdBarPercentage))} gold from your victory.<br>`, false, true)
                this.levelUp()
            } else {
                displayGenericModal(`You earned ${expReward} experience and ${Math.round(goldReward * (1 + crowdBarPercentage))} gold from your victory.<br>
                You have ${this.levelUps[this.level] - this.experience} experience remaining until next level.
                `, false, true)
            }
        }, 3000)
    }

    levelUp() {
        statScreenMessage.innerText = 'Your power grows...'
        this.level += 1
        this.statPoints += 5
        nextScreen = characterStatScreen
        characterStatBackBtn.style.display = 'none'
        toggleScreen('none', null, null)
        renderStats()
    }

    generateInventory() {
        let inventoryDisplay = `<b>Equipped Weapon: ${playerGladiator.weapon.itemName} - ${playerGladiator.weapon.minDamage} to ${playerGladiator.weapon.maxDamage} Base Damage</b><br>
        ${playerGladiator.weapon.description}<br><br>
        Equipped Armor: ${playerGladiator.armor.itemName} - ${playerGladiator.armor.armorBonus} Base Armor<br>
        ${playerGladiator.armor.description}<br><br>
        Purchased Equipment:<br>`

        allWeapons.forEach(weapon => {
            if (weapon.purchased === true && weapon.equipped === false) {
                inventoryDisplay += `${weapon.itemName} - <button class="inventoryEquip" type="weapon" id="${weapon.itemName}">EQUIP</button><br>`
            }
        })
        allArmor.forEach(armor => {
            if (armor.purchased === true && armor.equipped === false) {
                inventoryDisplay += `${armor.itemName} - <button class="inventoryEquip" type="armor" id="${armor.itemName}">EQUIP</button><br>`
            }
        })

        inventoryDisplay += `<br><button id="closeGenericModal">CLOSE</button>`

        displayGenericModal(inventoryDisplay, false, false)

        document.getElementById('closeGenericModal').addEventListener('click', (event) => {
            playSound(simpleClick)
            genericModal.style.display = 'none'
        })

        document.querySelectorAll('.inventoryEquip').forEach(button => {
            button.addEventListener('click', (event) => {
                playSound(simpleClick)
                let itemName = button.getAttribute('id')
                let itemType = button.getAttribute('type')
                let itemObj = ''
                if (itemType === 'weapon') {
                    for (const weapon in allWeapons) {
                        if (itemName === allWeapons[weapon].itemName) {
                            itemObj = allWeapons[weapon]
                        }
                    }
                } else {
                    for (const armor in allArmor) {
                        if (itemName === allArmor[armor].itemName) {
                            itemObj = allArmor[armor]
                        }
                    }
                }
                this.changeEquipment(itemObj)
                this.generateInventory()
            })
        })
    }

    generateOverview() {
        if (this === playerGladiator) {
            displayGenericModal(
            `${this.gladiatorName}<br>
            Level ${this.level}<br>
            HP: ${this.maxHealth} / Energy: ${this.maxEnergy} / Armor: ${this.maxArmor}<br>
            Damage (light): ${this.weapon.minDamage + this.strength * 2} to ${this.weapon.maxDamage + this.strength * 2}<br>
            Damage (med): ${(this.weapon.minDamage + this.strength * 2) * 1.5} to ${(this.weapon.maxDamage + this.strength * 2) * 1.5}<br>
            Damage (heavy): ${(this.weapon.minDamage + this.strength * 2) * 2} to ${(this.weapon.maxDamage + this.strength * 2) * 2}<br><br>
            Strength: ${this.strength}<br>
            Attack: ${this.attack}<br>
            Defense: ${this.defense}<br>
            Vitality: ${this.vitality}<br>
            Stamina: ${this.stamina}<br>
            Charisma: ${this.charisma}<br><br>
            Experience: ${this.experience}<br>
            Next Level: ${this.levelUps[this.level]}<br><br>
            Total Gold: ${this.gold}<br><br>
            Opponents Defeated: ${this.defeatedOpponents}
            `, false, true)
        } else {
            displayGenericModal(
                `${this.gladiatorName}<br>
                Level ${this.level}<br>
                HP: ${this.maxHealth} / Energy: ${this.maxEnergy} / Armor: ${this.maxArmor}<br>
                Damage (light): ${this.weapon.minDamage + this.strength * 2} to ${this.weapon.maxDamage + this.strength * 2}<br>
                Damage (med): ${(this.weapon.minDamage + this.strength * 2) * 1.5} to ${(this.weapon.maxDamage + this.strength * 2) * 1.5}<br>
                Damage (heavy): ${(this.weapon.minDamage + this.strength * 2) * 2} to ${(this.weapon.maxDamage + this.strength * 2) * 2}<br><br>
                Strength: ${this.strength}<br>
                Attack: ${this.attack}<br>
                Defense: ${this.defense}<br>
                Vitality: ${this.vitality}<br>
                Stamina: ${this.stamina}<br>
                Charisma: ${this.charisma}<br><br>
                You will earn ${this.experienceReward} XP and ${this.goldReward} gold for winning. Begin fight?<br>
                <button class="fightPrompt" data-yesno="yes">Start Fight</button> <button class="fightPrompt" data-yesno="no">Cancel</button>
                `, false, false)
            document.querySelectorAll('.fightPrompt').forEach(button => {
                button.addEventListener('click', (event) => {
                    playSound(simpleClick)
                    if (button.dataset.yesno === 'yes') {
                        crowdBarPercentage = 0.1 + 0.1 * (this.level)
                        nextScreen = battleScreen
                        toggleScreen('none', arenaBG.imgURL, arenaBG.displayStyle)
                        pauseSound(townMusic)
                        startBattle()
                    }
                    genericModal.style.display = 'none'
                })
            })
        }
    }

    generateWeaponsmith() {
        let weaponsmithDisplay = `Your Gold: ${this.gold}<br><br>`
        allWeapons.forEach(weapon => {
            if (weapon.purchased != true) {
                weapon.calcPrice()
                weaponsmithDisplay += `${weapon.itemName} | ${weapon.minDamage} to ${weapon.maxDamage} Base Damage | Gold Cost: ${weapon.price} | <button class="purchase" id="${weapon.itemName}">PURCHASE</button><br>
                ${weapon.description}<br><br>`
            }
        })
        if (weaponsmithDisplay === `Your Gold: ${this.gold}<br><br>`) {weaponsmithDisplay = 'There is nothing more you can purchase at the moment.'}
        weaponsmithTextEl.innerHTML = weaponsmithDisplay

        document.querySelectorAll('.purchase').forEach(button => {
            button.addEventListener('click', (event) => {
                playSound(simpleClick)
                let itemName = button.getAttribute('id')
                let itemObj = ''
                for (const weapon in allWeapons) {
                    if (itemName === allWeapons[weapon].itemName) {
                        itemObj = allWeapons[weapon]
                    }
                }
                if (itemObj.buyEquipment() === true) {this.generateWeaponsmith()}
            })
        })
    }

    generateArmorer() {
        let armorerDisplay = `Your Gold: ${this.gold}<br><br>`
        allArmor.forEach(armor => {
            if (armor.purchased != true) {
                armor.calcPrice()
                armorerDisplay += `${armor.itemName} | ${armor.armorBonus} Base Armor | Gold Cost: ${armor.price} | <button class="purchase" id="${armor.itemName}">PURCHASE</button><br>
                ${armor.description}<br><br>`
            }
        })
        if (armorerDisplay === `Your Gold: ${this.gold}<br><br>`) {armorerDisplay = 'There is nothing more you can purchase at the moment.'}
        armorerTextEl.innerHTML = armorerDisplay

        document.querySelectorAll('.purchase').forEach(button => {
            button.addEventListener('click', (event) => {
                playSound(simpleClick)
                let itemName = button.getAttribute('id')
                let itemObj = ''
                for (const armor in allArmor) {
                    if (itemName === allArmor[armor].itemName) {
                        itemObj = allArmor[armor]
                    }
                }
                if (itemObj.buyEquipment() === true) {this.generateArmorer()}
            })
        })
    }

    changeEquipment(itemToEquip) {
        if (itemToEquip.constructor.name === 'Weapon') {
            this.weapon.equipped = false
            this.weapon = itemToEquip
        } else if (itemToEquip.constructor.name === 'Armor') {
            this.armor.equipped = false
            this.armor = itemToEquip
            this.adjustSecondaryStats()
        }
        itemToEquip.equipped = true
    }

    makeAttack(target, attackType) {
        if (target.debuff === countered) {
            let totalDamage = this.calcDamage(attackType)
            this.checkArmor(totalDamage, target)
        } else {
            if (this.checkEnergy() === false) {return true}
            this.energy -= this.calcEnergy(attackType)
            this.calcCrowd(attackType)
            let hitChance = this.calcAccuracy(attackType, target.defense, target)
            if (Math.random() <= hitChance) {
                let critMultiplier = this.checkIfCritical(attackType)
                let totalDamage = this.calcDamage(attackType) * critMultiplier
                if (critMultiplier === 2) {
                    target.health -= totalDamage
                    if (attackType === 'light') {lightAtkCrit.generateBattleMessage(this, 'success')}
                    else if (attackType === 'medium') {medAtkCrit.generateBattleMessage(this, 'success')}
                    else {heavyAtkCrit.generateBattleMessage(this, 'success')}
                } else {
                    this.checkArmor(totalDamage, target)
                    if (attackType === 'light') {lightAtk.generateBattleMessage(this, 'success')}
                    else if (attackType === 'medium') {medAtk.generateBattleMessage(this, 'success')}
                    else {heavyAtk.generateBattleMessage(this, 'success')}
                }
            } else {
                if (attackType === 'light') {lightAtk.generateBattleMessage(this, 'fail')}
                else if (attackType === 'medium') {medAtk.generateBattleMessage(this, 'fail')}
                else {heavyAtk.generateBattleMessage(this, 'fail')}
            }
        }
        renderStats()
        return false
    }

    checkEnergy() {
        if (this.energy <= 0) {
            displayGenericModal('You do not have the energy to perform this action.', true, true)
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
            return 40 + 10 * this.strength
        }
    }

    calcAccuracy(action, targetStat, target) {
        let statDelta = null
        let calcAccuracy = null

        if (action === 'light' || action === 'medium' || action === 'heavy') {
            statDelta = this.attack - targetStat
        } else if (action === 'taunt') {
            statDelta = this.charisma - targetStat
            calcAccuracy = 0.5 + statDelta * 0.05
            if (calcAccuracy < 0.2) {calcAccuracy = 0.2}
            if (calcAccuracy > 0.9) {calcAccuracy = 0.9}
        }

        if (action === 'light') {
            calcAccuracy = 0.75 + statDelta * 0.1
            if (calcAccuracy < 0.33) {calcAccuracy = 0.33}
            if (calcAccuracy > 0.95) {calcAccuracy = 0.95}
        } else if (action === 'medium') {
            calcAccuracy = 0.5 + statDelta * 0.05
            if (calcAccuracy < 0.2) {calcAccuracy = 0.2}
            if (calcAccuracy > 0.80) {calcAccuracy = 0.80}
        } else if (action === 'heavy') {
            calcAccuracy = 0.25 + statDelta * 0.025
            if (calcAccuracy < 0.1) {calcAccuracy = 0.1}
            if (calcAccuracy > 0.5) {calcAccuracy = 0.5}
        }

        let debuffMod = 1
        if (this.debuff === enraged) {debuffMod = enraged.debuffMultiplier}
        if (target.debuff === distracted) {debuffMod = distracted.debuffMultiplier}

        return calcAccuracy * debuffMod
    }

    checkIfCritical(attackType) {
        if (attackType === 'light') {
            if (Math.random() <= 0.05) {return 2}
        } else if (attackType === 'medium') {
            if (Math.random() <= 0.10) {return 2}
        } else if (attackType === 'heavy') {
            if (Math.random() <= 0.20) {return 2}
        }
        return 1
    }

    calcDamage(attackType) {
        let weaponDamage = Math.round(this.weapon.minDamage + Math.random() * this.weapon.damageRange)
        if (attackType === 'light') {
            return weaponDamage + this.strength * 2
        } else if (attackType === 'medium') {
            return weaponDamage * 1.5 + this.strength * 2
        } else if (attackType === 'heavy') {
            return weaponDamage * 2 + this.strength * 2
        }
    }

    checkArmor(totalDamage, target) {
        if (totalDamage > target.armorRemaining) {
            totalDamage -= target.armorRemaining
            target.armorRemaining = 0
            target.health -= totalDamage
        } else {
            target.armorRemaining -= totalDamage
        }
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

    taunt(target) {
        if (this.checkEnergy() === false) {return true}
        this.energy -= 10
        this.calcCrowd('taunt')
        let successChance = this.calcAccuracy('taunt', target.charisma, target)
        if (Math.random() < successChance) {
            let rng = Math.random()
            if (rng >= 0.9) {
                target.debuff = countered
                this.makeAttack(target, 'light')
                tauntCounterMsg.generateBattleMessage(this, 'success')
            } else if (rng >= 0.6) {
                target.debuff = exhausted
                target.energy -= target.maxEnergy * exhausted.debuffMultiplier
                tauntExhaustedMsg.generateBattleMessage(this, 'success')
            } else if (rng >= 0.3) {
                target.debuff = distracted
                tauntDistractedMsg.generateBattleMessage(this, 'success')
            } else {
                target.debuff = enraged
                tauntEnragedMsg.generateBattleMessage(this, 'success')
            }
            target.debuffClear = battleRound + target.debuff.expiration
        } else {
            tauntFailMsg.generateBattleMessage(this, 'fail')
        }

        renderStats()
        return false
    }

    winTheCrowd() {
        if (this.checkEnergy() === false) {return true}
        this.energy -= 10
        this.calcCrowd('winTheCrowd')
        winTheCrowdMsg.generateBattleMessage(this, 'success')
        renderStats()
        return false
    }

    rest() {
        if (this.energy === this.maxEnergy) {
            displayGenericModal('Your energy is already full.', true, true)
            return true
        }
        this.energy = Math.round(this.energy + this.maxEnergy * 0.5)
        this.health = Math.round(this.health + this.maxHealth * 0.05)
        if (this.energy > this.maxEnergy) {this.energy = this.maxEnergy}
        if (this.health > this.maxHealth) {this.health = this.maxHealth}
        this.calcCrowd('rest')
        restMsg.generateBattleMessage(this, 'success')
        renderStats()
        return false
    }

    debuffHandler() {
        if (this.debuffClear <= battleRound) {
            this.debuff = 'NONE'
            this.debuffClear = null
        }
    }

    decideAction(target) {
        if (this.energy <= 0) {
            this.rest()
            return
        }
        let rng = Math.random()
        if (this.energy === this.maxEnergy) {
            if (rng <= 0.7) {
                this.decideAttack(target)
            } else if (rng <= 0.9) {
                this.taunt(target)
            } else {
                this.winTheCrowd()
            }
        } else {
            if (rng <= 0.6) {
                this.decideAttack(target)
            } else if (rng <= 0.8) {
                this.taunt(target)
            } else if (rng <= 0.9) {
                this.winTheCrowd()
            } else {
                this.rest()
            }
        }
    }

    decideAttack(target) {
        let attackRNG = Math.random()
        if (attackRNG <= 0.5) {
            this.makeAttack(target, 'light')
        } else if (attackRNG <= 0.85) {
            this.makeAttack(target, 'medium')
        } else {
            this.makeAttack(target, 'heavy')
        }
    }

    generateEnemy(difficultyMod, rewardMod) {
        this.level = playerGladiator.level + difficultyMod
        this.statPoints = this.level * 5
        this.gladiatorName = this.enemyGladiatorBasics[this.level][0]
        this.experienceReward = (this.enemyGladiatorBasics[this.level][1]) * rewardMod
        this.goldReward = (this.enemyGladiatorBasics[this.level][2]) * rewardMod
        this.weapon = this.enemyGladiatorGear[this.level][0 + Math.round(Math.random())]
        this.armor = this.enemyGladiatorGear[this.level][2 + Math.round(Math.random())]
        
        this.randomizeEnemyStats()
        this.adjustSecondaryStats()
        this.generateOverview()
    }

    randomizeEnemyStats() {
        const statArray = ['strength', 'attack', 'defense', 'vitality', 'stamina', 'charisma']
        statArray.forEach(stat => {
            this[stat] = 0
        })
        while (this.statPoints > 0) {
            let randomIndex = Math.floor(Math.random() * statArray.length)
            this[statArray[randomIndex]] += 1
            this.statPoints -= 1
        }
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


//Got this one from my software engineer friend who taught me about promises and promise chaining...
const delay = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, time)
    })
}

//Got this one from stackoverflow and modified it:
//https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
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
        if (stat != 'debuff') {
            span.textContent = playerGladiator[stat]
        } else {
            span.textContent = playerGladiator.debuff.debuffName
            if (span.textContent === '') {span.textContent = 'NONE'}
        }
        
    })
    enemyStats.forEach(span => {
        stat = span.getAttribute('stat')
        if (stat != 'debuff') {
            span.textContent = enemyGladiator[stat]
        } else {
            span.textContent = enemyGladiator.debuff.debuffName
            if (span.textContent === '') {span.textContent = 'NONE'}
        }
    })
    allActionBtns.forEach(button => {
        action = button.getAttribute('id')
        if (action != 'winTheCrowd' && action != 'rest') {
            accSpanID = `${action}Acc`
            if (action != 'taunt') {
                actionAcc = playerGladiator.calcAccuracy(action, enemyGladiator.defense, enemyGladiator)
            } else {
                actionAcc = playerGladiator.calcAccuracy(action, enemyGladiator.charisma, enemyGladiator)
            }
            actionAcc = `${Math.round(actionAcc * 100)}%`
            document.getElementById(accSpanID).innerText = actionAcc
        }
    })
}

function toggleScreen(fadeType, newBackgroundImg, newBackgroundSize) {
    if (fadeType === 'none') {
        if (currentScreen != null) {currentScreen.style.display = 'none'} 
        nextScreen.style.display = 'flex'
    } else if (fadeType === 'fadeIn') {
        if (currentScreen != null) {currentScreen.style.display = 'none'} 
        unfade(nextScreen, 100)
    } // else if(fadeType === 'fadeOut') {
    // NOT CURRENTLY USING FADE OUT
    // }
    currentScreen = nextScreen
    if (newBackgroundImg != null) {document.body.style.backgroundImage = newBackgroundImg}
    if (newBackgroundSize != null) {document.body.style.backgroundSize = newBackgroundSize}
}

function displayGenericModal(modalText, plainText, easyDismiss) {
    if (plainText === true) {
        genericModalTextEl.innerText = modalText
    } else {
        genericModalTextEl.innerHTML = modalText
    }
    easyDismissGlobal = easyDismiss
    genericModal.style.display = 'flex'
}

function startBattle() {
    if (storyPhase != 0) {resetBattle()}
    playSound(battleMusic)
    renderStats()
    battleRound = 1
    crowdBar.style.width = `${crowdBarPercentage * 100}%`
}

function progressBattle() {
    battleRound += 1
    if (enemyGladiator.debuff != countered) {
        playerActions.style.opacity = 0
        enemyTurn = true
        setTimeout(() => {
            enemyGladiator.decideAction(playerGladiator)
            if (playerGladiator.health <= 0) {
                endBattle(false)
                return
            }
            if (playerGladiator.debuff === countered) {
                playerGladiator.debuffHandler()
                progressBattle()
                return
            }
            playerActions.style.opacity = 1
            enemyTurn = false
        }, 3000)
    }
    battleRound += 1
    playerGladiator.debuffHandler()
    enemyGladiator.debuffHandler()
}

function endBattle(didPlayerWin) {
    setTimeout(() => {
        leaveBattleBtn.style.display = 'flex'
    }, 3000)
    if (didPlayerWin === true) {
        battleEndMsg.generateBattleMessage(playerGladiator, 'success')
        playerGladiator.getRewards(enemyGladiator.experienceReward, enemyGladiator.goldReward)
        if (storyPhase === 0) {
            leaveBattleBtnBehavior = firstFightDoneCutscene
            nextScreen = cutsceneContainer
            storyPhase = 1
        } else {
            leaveBattleBtnBehavior = null
        }
    } else {
        battleEndMsg.generateBattleMessage(playerGladiator, 'fail')
        leaveBattleBtnBehavior = playerLosesCutscene
    }
}

function leaveBattle() {
    pauseSound(battleMusic)
    if (leaveBattleBtnBehavior != null) {
        nextScreen = cutsceneContainer
        toggleScreen('none', mainBG.imgURL, mainBG.displayStyle)
        leaveBattleBtnBehavior.renderCutscene()
    } else {
        playSound(townMusic)
        nextScreen = townScreen
        enterArenaScreen.style.display = 'none'
        buildingsContainer.style.display = 'flex'
        townInterfaceOpen = false
        toggleScreen('none', townBG.imgURL, townBG.displayStyle)
    }
}

function resetBattle() {
    playerGladiator.health = playerGladiator.maxHealth
    playerGladiator.energy = playerGladiator.maxEnergy
    playerGladiator.armorRemaining = playerGladiator.maxArmor
    playerGladiator.debuff = 'NONE'
    playerGladiator.debuffClear = null

    enemyTurn = false
    battleStartMsg.generateBattleMessage(playerGladiator, 'success')
    leaveBattleBtn.style.display = 'none'
    playerActions.style.opacity = 1

    renderStats()
}

//
//
//
//EVENT LISTENERS
//
//
//

allButtons.forEach(button => {
    if (button != endCutsceneBtn) {
    button.addEventListener('click', (event) => {
        playSound(simpleClick)
    })
    } else if (endCutsceneBtn.style.opacity >= 1) {
        playSound(simpleClick)
    }
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

allActionBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        if (enemyTurn === false) {
            let playerTookNoAction = false
            let buttonID = button.getAttribute('id')
            if (buttonID === 'light' || buttonID === 'medium' || buttonID === 'heavy') {
                playerTookNoAction = playerGladiator.makeAttack(enemyGladiator, buttonID)
            } else if (buttonID === 'taunt') {
                playerTookNoAction = playerGladiator.taunt(enemyGladiator)
            } else {
                playerTookNoAction = playerGladiator[buttonID]()
            }
            if (playerTookNoAction === false && enemyGladiator.health > 0) {
                progressBattle()
            } else if (enemyGladiator.health <= 0) {
                enemyTurn = true
                playerActions.style.opacity = 0
                endBattle(true)
            }
        } 
    })
})

townOpenBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        let buttonID = button.getAttribute('id')
        if (townInterfaceOpen === false) {
            if (buttonID === 'arena') {
                enterArenaScreen.style.display = 'flex'
            }
            else if (buttonID === 'inn') {
                enterInnScreen.style.display = 'flex'
            }
            else if (buttonID === 'weaponsmith') {
                weaponsmithScreen.style.display = 'flex'
                playerGladiator.generateWeaponsmith()
            }
            else if (buttonID === 'armorer') {
                armorerScreen.style.display = 'flex'
                playerGladiator.generateArmorer()
            }
            townInterfaceOpen = true
            buildingsContainer.style.display = 'none'
        }
    })
})

townCloseBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        let buttonID = button.getAttribute('id')
        if (townInterfaceOpen === true) {
            if (buttonID === 'closeArena') {enterArenaScreen.style.display = 'none'}
            else if (buttonID === 'closeInn') {enterInnScreen.style.display = 'none'}
            else if (buttonID === 'closeWeaponsmith') {weaponsmithScreen.style.display = 'none'}
            else if (buttonID === 'closeArmorer') {armorerScreen.style.display = 'none'}
            townInterfaceOpen = false
            buildingsContainer.style.display = 'flex'
        }
    })
})

startBattleBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        enemyGladiator.generateEnemy(parseInt(button.dataset.levelmod), parseFloat(button.dataset.rewardmod))
    })
})

loadBtn.addEventListener('click', (event) => {
    loadBtn.style.display = 'none'
    playSound(startMusic)
    nextScreen = startScreen
    toggleScreen('fadeIn', outsideArenaBG.imgURL, outsideArenaBG.displayStyle)
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
    , true, true)
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
    toggleScreen('none', null, null)
})

characterStatConfirmBtn.addEventListener('click', (event) => {
    if(playerGladiator.statPoints === 0 && isPlayerLevelingUp === false) {
        pauseSound(startMusic)
        isPlayerLevelingUp = true
        nextScreen = cutsceneContainer
        toggleScreen('none', mainBG.imgURL, mainBG.displayStyle)
        introCutscene.renderCutscene()
    } else if(playerGladiator.statPoints === 0 && isPlayerLevelingUp === true) {
        pauseSound(battleMusic)
        playSound(townMusic)
        nextScreen = townScreen
        toggleScreen('none', townBG.imgURL, townBG.displayStyle)
    } else {
        displayGenericModal('You must allocate all stat points before proceeding.', true, true)
        return
    }
    playerGladiator.adjustSecondaryStats()
})

characterStatBackBtn.addEventListener('click', (event) => {
    nextScreen = startScreen
    toggleScreen('none', null, null)
})

genericModal.addEventListener('click', (event) => {
    if (easyDismissGlobal === true) {genericModal.style.display = 'none'}
})

endCutsceneBtn.addEventListener('click', (event) => {
    if (endCutsceneBtn.style.opacity >= 1) {
        pauseSound(cutsceneMusic)
        playSound(activeCutscene.postCutsceneMusic)
        nextScreen = activeCutscene.postCutsceneScreen
        toggleScreen('none', townBG.imgURL, townBG.displayStyle)
        if (activeCutscene.postCutsceneBattle === true) {
            startBattle()
            toggleScreen('none', arenaBG.imgURL, arenaBG.displayStyle)
        }
    }
})

leaveBattleBtn.addEventListener('click', (event) => {
    leaveBattle()
})

openInventoryBtn.addEventListener('click', (event) => {
    playerGladiator.generateInventory()
})

openOverviewBtn.addEventListener('click', (event) => {
    playerGladiator.generateOverview()
})