const story = {
    start: {
        text: "You set sail from Dawn Island, determined to find the One Piece! Do you visit Loguetown first or head straight to the Grand Line?",
        choices: [
            { text: "Go to Loguetown", next: "loguetown" },
            { text: "Sail to the Grand Line", next: "grandLine" }
            
        ],
        background:"images/background1.webp"
        
    },
    loguetown: {
        text: "You arrive at Loguetown, the city where Gol D. Roger was executed. Do you explore or steal a ship upgrade?",
        choices: [
            { text: "Explore the city", next: "exploreCity" },
            { text: "Steal an upgrade", next: "stealUpgrade" }
        ],
        background:"images/Loguetown.jpeg"
    },
    grandLine: {
        text: "You brave the treacherous waters of Reverse Mountain! Do you trust your navigator or steer the ship yourself?",
        choices: [
            { text: "Trust the navigator", next: "navigator" },
            { text: "Steer yourself", next: "steerShip" }
        ],
        background:"images/water.jpeg"
    },
    exploreCity: {
        text: "You meet a mysterious swordsman who offers to join your crew! Do you accept?",
        choices: [
            { text: "Accept the swordsman", next: "recruitSwordsman" },
            { text: "Decline and move on", next: "declineSwordsman" }
        ],
        background:"images/zoroluffy.jpg"
    },
    stealUpgrade: {
        text: "You get caught by the Marines! You're thrown in Impel Down! Game Over.",
        choices: [{ text: "Restart", next: "start" }],
        background:"images/jail.jpeg"
    },
    navigator: {
        text: "Your navigator guides you safely into the Grand Line. Do you head for Alabasta or Skypiea?",
        choices: [
            { text: "Go to Alabasta", next: "alabasta" },
            { text: "Go to Skypiea", next: "skypiea" }
        ],
        background:"images/grandline.jpg"
    },
    steerShip: {
        text: "You crash into the Red Line and sink. Game Over.",
        choices: [{ text: "Restart", next: "start" }],
        background:"images/redline.jpeg"
    },
    recruitSwordsman: {
        text: "The swordsman is powerful and helps you defeat enemies! You continue your journey with a strong crew.",
        choices: [{ text: "Continue", next: "grandLine" }],
        background:"images/roro.webp"
    },
    declineSwordsman: {
        text: "You move on alone, but without strong allies, you struggle. Game Over.",
        choices: [{ text: "Restart", next: "start" }],
        background:"images/boat.jpeg"
    },
    alabasta: {
        text: "You  defeat Crocodile and earn a powerful ally! Do you seek an even greater challenge?",
        choices: [
            { text: "Face an Emperor", next: "faceEmperor" },
            { text: "Find a Poneglyph", next: "poneglyph" }
        ],
        background:"images/croc.jpeg"
    },
    skypiea: {
        text: "You battle Enel and claim his gold! You now have enough treasure to continue your adventure.",
        choices: [{ text: "Sail forward", next: "faceEmperor" }],
        background:"images/enel.jpeg"
    },
    faceEmperor: {
        text: "You challenge an Emperor of the Sea! Do you fight Kaido or Big Mom?",
        choices: [
            { text: "Fight Kaido", next: "kaidoFight" },
            { text: "Fight Big Mom", next: "bigMomFight" }
        ],
        background:"images/kaido.jpg"
    },
    poneglyph: {
        text: "You discover an important clue to the One Piece! You are one step closer to becoming Pirate King!",
        choices: [{ text: "Continue", next: "faceEmperor" }],
        background:"images/poly.jpeg"
    },
    kaidoFight: {
        text: "Kaido is too strong! He defeats you. Game Over.",
        choices: [{ text: "Restart", next: "start" }],
        background:"images/kk.jpeg"
    },
    bigMomFight: {
        text: "You defeat Big Mom and make history! You are now one of the strongest pirates in the world!",
        choices: [{ text: "Claim the One Piece", next: "onePiece" }],
        background:"images/luffy.png"
    },
    onePiece: {
        text: "After years of adventure, you finally find the One Piece! You are the new Pirate King!",
        choices: [{ text: "Restart", next: "start" }],
        background:"images/king.jpeg"
    }
};

const gameContainer = document.getElementById("game-container");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const storyText = document.getElementById("story-text");
const choicesContainer = document.getElementById("choices-container");

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameContainer.style.display = "block";
    updateStory("start");
});

function updateStory(node) {
    storyText.textContent = story[node].text;
    choicesContainer.innerHTML = "";

    
    document.body.style.backgroundImage = `url('${story[node].background}')`;

    story[node].choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => updateStory(choice.next);
        choicesContainer.appendChild(button);
    });
}

