const storyText = document.getElementById("storyText");
const hiddenStories = document.querySelectorAll("#hiddenStories p");
const burningSound = new Audio("images/firesound.ogg");
const choicesContainer = document.getElementById("choicesContainer");
const dialogueBox = document.getElementById("dialogueBox");

burningSound.volume = 1.0;
burningSound.muted = false;
document.addEventListener("click", function () {
    burningSound.play().catch(error => console.error("Audio Play Error:", error));
});

let index = -1;
let intervalId;
let isPaused = false;



function changeScene() {
    if (isPaused) return;
   
    const currentStory = hiddenStories[index];
    storyText.value = currentStory.textContent;

    const storyContainer = document.querySelector(".story-container");
    storyContainer.style.height = "auto";
    storyContainer.style.width = "auto";
    storyText.style.height = "auto";
    storyText.style.height = storyText.scrollHeight + "px";

    let videoContainer = document.querySelector(".video-container");

    if (index === 8) {
        
        const videoPath = currentStory.getAttribute("data-video");

        if (videoPath) {
            if (!videoContainer) {
                videoContainer = document.createElement("div");
                videoContainer.classList.add("video-container");
                videoContainer.innerHTML = `
                    <video autoplay loop muted playsinline>
                        <source src="${videoPath}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
                document.body.prepend(videoContainer);
            } else {
                videoContainer.querySelector("video source").src = videoPath;
                videoContainer.querySelector("video").load();
            }
        }

        choicesContainer.style.display = "flex";  

    } else {
        // Hide video and choices from index 9 onwards
        if (videoContainer) {
            videoContainer.remove();
        }

        if (index > 8) {
            choicesContainer.style.display = "none";
        }

        
        document.body.style.backgroundImage = `url(${currentStory.getAttribute("data-image")})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.transition = "background 1s ease-in-out";
    }

   
    if (index !== 8) {
        document.body.style.backgroundImage = `url(${currentStory.getAttribute("data-image")})`;
    }

    //Sound effects
    if (index >= 4 && index <= 10) {
        burningSound.loop = true;
        burningSound.play();
    } else {
        burningSound.pause();
        burningSound.currentTime = 0;
    }



    //choice1 logic
    if (window.location.pathname.includes("choice1.html")) {
        
        let zoroImage = document.querySelector(".foreground-character");
        let sanjiImage = document.querySelector(".foreground-character1");
        if (index === 0) {
            storyText.value = hiddenStories[index].textContent; // Show first story
        }
        if (index === 1) {  
           
            if (!zoroImage) {
                zoroImage = document.createElement("img");
                zoroImage.src = "../images/zoro1.png";
                zoroImage.alt = "Zoro";
                zoroImage.classList.add("foreground-character");
                document.body.appendChild(zoroImage);
            }
        } else {
         
            if (zoroImage) {
                zoroImage.remove();
            }
        }
    
        if (index === 2) {  
            // Sanji for index 2
            if (!sanjiImage) {
                sanjiImage = document.createElement("img");
                sanjiImage.src = "../images/sanji1.png";
                sanjiImage.alt = "Sanji";
                sanjiImage.classList.add("foreground-character1");
                document.body.appendChild(sanjiImage);
            }
        } else {
           
            if (sanjiImage) {
                sanjiImage.remove();
            }
        }
    }
    
    
    if (index < hiddenStories.length - 1) {
        index++;
    } else {
        clearInterval(intervalId);
    }
}


//choice2 logic
if (window.location.pathname.includes("choice2.html")) {
    let zoroImage = document.querySelector(".foreground-character");
    let sanjiImage = document.querySelector(".foreground-character1");
    if (index === 0) {
        storyText.value = hiddenStories[index].textContent; // Show first story
    }
    if (index === 1) {  
       
        if (!zoroImage) {
            zoroImage = document.createElement("img");
            zoroImage.src = "../images/zoro1.png";
            zoroImage.alt = "Zoro";
            zoroImage.classList.add("foreground-character");
            document.body.appendChild(zoroImage);
        }
    } else {
        
        if (zoroImage) {
            zoroImage.remove();
        }
    }

    if (index === 2) {  
       
        if (!sanjiImage) {
            sanjiImage = document.createElement("img");
            sanjiImage.src = "../images/sanji1.png";
            sanjiImage.alt = "Sanji";
            sanjiImage.classList.add("foreground-character1");
            document.body.appendChild(sanjiImage);
        }
    } else {
        
        if (sanjiImage) {
            sanjiImage.remove();
        }
    }
}


if (index < hiddenStories.length - 1) {
    index++;
} else {
    clearInterval(intervalId);
}




function chooseOption(choice) {
    
    document.getElementById("hiddenStories").style.display = "none";
    document.getElementById("storyText").style.display = "none";
    document.getElementById("choicesContainer").style.display = "none";

    const videoContainer = document.querySelector(".video-container");
    if (videoContainer) {
        videoContainer.remove();
    }

    if (choice === 1) {
        window.location.href = "Scene1/choice1.html"; 
    }
    if (choice === 2) {
        window.location.href = "Scene1/choice2.html"; 
    }
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        event.preventDefault();
        togglePause();
    }
});

document.addEventListener("click", changeScene);
document.getElementById("storyText").addEventListener("click", changeScene);

changeScene();
