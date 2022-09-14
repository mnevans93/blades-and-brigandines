    There will be multiple containers/screens for each main area of the game:
    Start/character creation screen
        Build in a modal that explains basic mechanics such as what effects stats have, how to battle, what each battle action does, how to spend gold, how to level up (or just link the player to the README.md)
        Player hits start which pulls up character creation screen
        Stretch goal - implement character save feature via Localstorage
        Player allocates stat points into attack, strength, defense, vitality, stamina, charisma

            Attack - determines how accurate the gladiator's attacks are. Level 0 attack against level 0 defense means 75% chance on light, 50% on medium, and 25% on heavy. Each point of attack increases chance of hitting and is directly contested by enemy's defense
                Light attacks become 10% more accurate every level
                Medium attacks become 5% more accurate every level
                Heavy attacks become 2.5% more accurate every level

            Strength - determines how much bonus damage the gladiator's attacks do. Level 0 strength is zero bonus damage with each point of strength increasing base damage. Each level of strength also increases the base stamina requirement of each attack style by 20% of its initial value
                Light attacks require 10 base stamina + 2 for every strength level and deal 2 bonus damage per strength level
                Medium attacks require 25 base stamina + 5 for every strength level and deal 5 bonus damage per strength level
                Heavy attacks require 40 base stamina + 10 for every strength level and deal 10 bonus damage per strength level

            Defense - determines how hard it is to hit the gladiator. Directly counteracts attacker's attack stat. Each point of defense increases chance to block the attack by the same percentages shown in attack

            Vitality - determines gladiator's health scaling. At level 0 vitality, gladiators have 20 HP, and each character level, they gain 20 additional base HP. Each point of vitality grants an additional 5 HP per level-up on top of the base of 20. This is retroactive so leveling vitality at higher character levels will take into account all previous levels as well

            Stamina - determines gladiator's stamina pool scaling. At level 1, gladiators have 50 stamina, and each level they gain an additional 50 stamina. Each point of stamina grants an additional 10 stamina per level-up on top of the base 50. This is retroactive so leveling stamina at higher levels will take into account all previous levels as well
                Rest: This action restores 50% of the gladiator's stamina. Not usable if stamina is full. Only available action if gladiator has <= 0 stamina on their turn

            Charisma - determines extra gold earned from fights, shop discounts, and taunt/win the crowd effectiveness. Base gold earned is 80% of potential value, and shop prices are 120% their normal values. Each level is 5% additional gold/shop discount. Level 1 taunts have a 50% chance to succeed and each level of charisma increases chance to succeed by 5%, directly contested by opponent's charisma which subtracts 5% from taunt success chance. Each level of charisma makes win the crowd 25% more effective.
                Taunt: This action, if successful, inflicts a random debuff on the enemy
                    Debuffs:
                        30% chance - Enraged - Decreases chance of opponent's next attack to hit by 50%. Expires at the end of opponent's next turn
                        30% chance - Distracted - Increases your chance to hit your opponent by 50% on your next attack. Expires at the end of your next turn
                        30% chance - Exasperated - Reduces opponent's stamina by 50% of current total
                        10% chance - Countered - Skip opponent's next turn and hit them with a free light attack
                Win the Crowd: This action raises the crowd's engagement in the battle by a minimum of 20%. Crowd engagement scales from 0 to 100% and acts as a bonus to gold earned from a fight with 100% engagement rewarding a win with 2x the gold. Each point of charisma increases crowd engagement by 5%, so a gladiator with level 10 charisma would raise crowd engagement by 70%
            
    Town screen where the player can access the different shops as well as the arena. They can also access their character's inventory to change weapons, armor, etc.
        Buttons on top side of screen for accessing:
            Character status - shows summary of stats such as basic stats, but also secondary stats like total damage, total armor pool, as well as a list of currently equipped gear
            Character inventory - shows all items player owns and allows them to change equipment, see how much gold they have, etc.
            Return to the start screen (stretch goal - allow user to save character)
        Images to represent locations character can visit
            Shops:
                Weaponsmith - sells weapons
                    (stretch goal - give weapons unique properties to diversify weapon choice)
                    Player starts with a rusty knife - "Better than nothing - barely."
                    Item options:
                        Serrated dagger - "Isn't this just a steak knife?"
                        Machete - "Useful for cutting through many things, including your enemies."
                        Shortsword - "A warrior's friend."
                        ...etc...
                Armorsmith - sells armor
                    (stretch goal - give armor unique properties to diversify armor choice)
                    Hide armor - "Stitched-together hides that make you look like a barbarian. They don't cover much."
                    Padded armor - "Covers all the important bits, but it's not very sturdy either."
                    Leather armor - "Fitted, more durable armor. This might just keep you alive."
                    ...etc...
                Stretch goal - Inn - player sleeps here to fully heal, charges a flat fee each time player sleeps. Player can do maximum of three matches before sleeping, minimum of one
                Stretch goal - Enchanter - enchants weapons and armor with various effects from stat boosts to special abilities
                Stretch goal - Alchemist - sells one-time use consumables, character can only carry a certain number at any given time
            Arena:
                The player can choose a normal, hard, or deadly fight for their level. Difficulties will be based on character's level, and hard/deadly will add a +1/+2 level scaling factor respectively to the randomly generated enemy, so a normal fight opponent will be equivalent level to player, while hard and deadly opponents will be 1 and 2 levels higher respectively. They will yield higher gold and experience as well
                Two types of fights - to yield or to the death
                    Yield: The player fights their opponent until either one of them are reduced to below half HP. 33% of the usual gold gain, player loses gold on a loss
                    To the death: Self-explanatory. Full gold gain, but player can die
                Stretch goal - set up tournaments that the player can become eligible for once they reach certain levels where they fight a series of enemies without breaks. Tournaments are always to the death
                
    Battle screen where the player fights the randomly generated enemy and receives gold and experience towards their next level. If the player dies, it's game over
        (Stretch goal: use sessionStorage to allow user to retry a battle? Add game state to sessionStorage before battle, then reload sessionStorage game state data to give user another try)
        Player has the following options in battle:
            Attacks: light, medium, heavy. Heavier the attack, the more potential damage, less accuracy, and higher crit chance. Light is 1x damage multiplier, medium is 1.5x, heavy is 2x. Light crit chance is 5%, medium is 10%, heavy is 20%. Crits double the damage dealt and pierce through armor to health
            Rest: This action restores 50% of the gladiator's stamina and restores a small portion of their health. Not usable if stamina is full. Only available action if gladiator has <= 0 stamina on their turn
            Taunt: This action, if successful, inflicts a random debuff on the enemy
                Debuffs:
                    30% chance - Enraged - Decreases chance of opponent's next attack to hit by 50%. Expires at the end of opponent's next turn
                    30% chance - Distracted - Increases your chance to hit your opponent by 50% on your next attack. Expires at the end of your next turn
                    30% chance - Exasperated - Reduces opponent's stamina by 50% of current total
                    10% chance - Countered - Skip opponent's next turn and hit them with a free light attack
            Win the Crowd: This action raises the crowd's engagement in the battle by a minimum of 10%. Crowd engagement scales from 0 to 100% and acts as a bonus to gold earned from a fight with 100% engagement rewarding a win with 2x the gold. Each point of charisma increases crowd engagement by 5%, so a gladiator with level 10 charisma would raise crowd engagement by 60%
            Yield: Player yields early. Not available in fights to the death
        Reward screen:
            Player receives gold and experience based on level of their opponent
            If player has enough xp for a level up, character stat window will appear and allow user to allocate additional stat points

    Starting development path:
        1. Build HTML and rough CSS for main screen (done)
        2. Build HTML and rough CSS for character creation screen
            a. All stats: span for each stat value, button for each stat to allocate stat points
            b. Display remaining stat points to allocate
            c. Button to start game or to cancel and go back to the main screen
            d. Display button to start game only when all stat points are allocated
        3. Start writing JavaScript
            a. Declare Gladiator class with constructor(name, attack, strength, defense, vitality, stamina, charisma), add other properties/methods later
            b. Declare playerGladiator and enemyGladiator object variables but do not instantiate them yet
            c. Declare necessary global variables for HTML elements such as name input field, stat spans, allocate buttons
            d. Write event listener for start game button to initialize the game
                i. Instantiate playerGladiator object with the information input by the user
                ii. Instantiate an enemyGladiator object for the player to fight
                    a. Create random stat generator class method
                    etc.