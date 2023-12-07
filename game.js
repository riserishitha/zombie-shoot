// Iteration 1: Declare variables required for this game
let time = 60;
let holebody = document.getElementById("game-body");
let arr = ['./assets/zombie-1.png',
           './assets/zombie-2.png',
           './assets/zombie-3.png',
           './assets/zombie-4.png',
           './assets/zombie-5.png',
           './assets/zombie-6.png'
        ];

// Iteration 1.2: Add shotgun sound
holebody.addEventListener("click",function(){
    let gunsound = new Audio("./assets/shotgun.wav");
    gunsound.play();
    gunsound.volume = 0.3; 
});

// Iteration 1.3: Add background sound
let backgroundsound = new Audio('./assets/bgm.mp3');
backgroundsound.play();
backgroundsound.loop = true;
backgroundsound.volume = 0.2; 

// Iteration 1.4: Add lives
let lifesleft = 0;

// Iteration 2: Write a function to make a zombie
let zombieID = 0; 
function zombiecreate(){
    let anyzombie = arr[Math.floor(Math.random() * 6)];
    holebody.innerHTML += `<img src='${anyzombie}' alt='${anyzombie}' class='zombie-image' id='zombie-${zombieID}'/>`;

    let divzombie = document.getElementById("zombie-"+zombieID);
    let translaterandom = Math.floor(Math.random() * (80 - 20)) + 20;
    divzombie.style.transform = `translateX(${translaterandom}vw)`;
    let secondrandom = Math.floor(Math.random() * (7 - 2)) + 2;
    divzombie.style.animationDuration = `${secondrandom}s`;
    divzombie.addEventListener("click", function(){
        removezombie(divzombie);
    });
}

// Iteration 3: Write a function to check if the player missed a zombie
function removezombie(divzombie){
    divzombie.style.display = "none";
    zombieID++;
    zombiecreate();
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
setInterval(function(){
    time = time - 1;
    document.getElementById("timer").innerHTML = time;

    let missed = document.getElementById("zombie-" + zombieID);
    if (missed) {
        let topd = missed.getBoundingClientRect().top;
        if (topd <= 0){
            lifesleft++;
            if (lifesleft == 4){
                window.location.href = './game-over.html';
                console.log('Game-Over');
            }
            removezombie(missed);
        }
    }

    if (time == 0){
        window.location.href = './win.html';
        console.log('Winner');
    }
}, 1000);

// Iteration 5: Creating timer

// Iteration 6: Write a code to start the game by calling the first zombie
zombiecreate();

// Iteration 7: Write the helper function to get a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
