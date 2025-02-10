
const storyText = document.getElementById("storyText");
const hiddenStories = document.querySelectorAll("#hiddenStories p");
const burningSound = new Audio("images/fire-sound-effect-21991.mp3");
burningSound.volume = 1.0;
burningSound.muted = false; 
document.addEventListener("click", function () {
    burningSound.play().catch(error => console.error("Audio Play Error:", error));
});

let index = 0;
let intervalId; 
let isPaused = false;
function changeScene() {
    if (isPaused) return;
   
    const currentStory = hiddenStories[index];

    
    storyText.value = currentStory.textContent;

    
    document.body.style.backgroundImage = `url(${currentStory.getAttribute("data-image")})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background 1s ease-in-out";

    if (index === 1) {
        burningSound.loop = true;
        burningSound.play();
    } else {
        
        burningSound.pause();
        burningSound.currentTime = 0; 
    }

    if (index < hiddenStories.length - 1) {
        index++;
    } else {
        clearInterval(intervalId); 
    }
    
}
function startSceneLoop() {
    intervalId = setInterval(changeScene, 2000);
}


function togglePause() {
    isPaused = !isPaused;
    const pauseBtn = document.getElementById("pauseBtn");

    if (isPaused) {
        clearInterval(intervalId); 
        burningSound.pause();
        pauseBtn.textContent = "Resume";
    } else {
        startSceneLoop(); 
        
        pauseBtn.textContent = "Pause";
    }
}


document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        event.preventDefault(); 
        togglePause();
    }
});

startSceneLoop();
changeScene();
