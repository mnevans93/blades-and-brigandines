# *Blades and Brigandines* #
## An HTML/CSS/JS browser-based game inspired by the *Swords and Sandals* Flash-game series! ##

<center>

![crossed swords](Images/crossed%20swords.png)

</center>

### Intro ###
Hi there! I'm Matthias Nevans, and thanks for checking out this repository for *Blades and Brigandines*. As the heading suggests, I was heavily inspired to create this game by *Swords and Sandals*, and I saw an opportunity to do my own spin on those games I love so much as my first major project for the General Assembly Software Engineering Immersive bootcamp.

### Game Mechanics ###
If you've never played a *Swords and Sandals* game before, they are gladiator-style turn-based RPG's. *Blades and Brigandines* follows a very similar structure for game mechanics, but the implementation is quite a bit different since it is built with HTML, CSS, and JS instead of Flash :skull: You will create a gladiator and assign stat points to any of the six stats: Strength, Attack, Defense, Vitality, Stamina, and Charisma. As you win fights, you gain experience and gold, which are used to level up your gladiator and buy new gear respectively. If you are familiar with RPG's, this should all sound pretty familiar! This is a roguelike take on the game as well; there are no saves, and death is final - that is, unless I add in save/load functionality later :sweat_smile:

### Project Overview ###
When approaching this project, I wanted to emulate most of the mechanics and systems of *Swords and Sandals* as much as possible, so I could focus on simplifying things into a series of containers for various aspects of the game and packing in as much object-oriented programming as possible. I made heavy use of CSS flexbox with ID'd HTML elements to get the structure I wanted, and I went for a relatively simple visual design with a number of little tricks sprinkled throughout to get things looking how I wanted. As far as focusing on OOP goes, that is evident in the fact that the ***Gladiator*** class is by far my biggest block of code. It helps to run combat more smoothly by linking properties of both the player gladiator and their enemies through this class instead of a bunch of standalone variables and functions. Not only that, but ***Weapons*** and ***Armor*** extend the ***Equipment*** class, the game's cutscenes are handled by the ***Cutscene*** class, and so on.

### Visuals ###

I can't take full credit for the background and color selections since I had a wonderful friend with visual design talents to assist me on that front; however, I did spend far more time than I would have liked to on building the HTML and CSS to create the different containers I needed, such as the Start Screen, the Character Creation Screen, the Cutscene Screen, etc. The game tracks the current screen using global variables, and whenever a screen transition is required, these variables are updated accordingly to seamlessly toggle the displayed screen, each represented by a unique container within the HTML. Prompts, such as the player not having enough energy to do something in combat, are handled using a generic modal that can be called from anywhere and can be easily dismissed. Shop screens, player status, and player inventory screens are also included for some additional functionality.

### JavaScript ###

The majority of my time was spent writing JS for this project and trying to make it as DRY as possible. As previously mentioned, I made heavy use of object-oriented programming to handle many aspects of the game. The JS is grouped by Global Variables, then Classes and Object declarations, followed by generic functions, and lastly all the event listeners. This (hopefully) makes the code a bit easier to follow and read through. The bulk of the code is in the Classes and Object declaration section. Fun fact, the renderCutscene method on the **Cutscene** class utilizes promise chaining because why not learn about that at 10pm on a weekday from my software engineer friend? I could have achieved the same result using staggered setTimeouts, but that wouldn't have been as educational :sweat_smile:

### Closing ###
Thanks for checking out my repo and reading this far! I'm always open to comments, suggestions, or constructive criticism, so let me know if you have any.