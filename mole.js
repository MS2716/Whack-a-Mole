let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLeft = 30; // Set the initial time limit (in seconds)
let timerInterval;

window.onload = function() {
    setGame();
}

function setGame() {
    // Set up the grid in HTML
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, 1500);
    setInterval(setPlant, 1000);
    startTimer();
}

function startTimer() {
    document.getElementById("timer").innerHTML = `Time Left: ${timeLeft}`;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").innerHTML = `Time Left: ${timeLeft}`;
        } else {
            endGame();
        }
    }, 1000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    let num = getRandomTile();

    if (currPlantTile && currPlantTile.id == num) {
        return;
    }

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    let num = getRandomTile();

    if (currMoleTile && currMoleTile.id == num) {
        return;
    }

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerHTML = score.toString();
    } else if (this == currPlantTile) {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    clearInterval(timerInterval);
    document.getElementById("score").innerHTML = `GAME OVER: ${score}`;
    document.getElementById("timer").innerHTML = "Time's Up!";
}

function restartGame() {
    // Reset variables
    score = 0;
    timeLeft = 30;
    gameOver = false;

    // Clear board
    if (currMoleTile) currMoleTile.innerHTML = "";
    if (currPlantTile) currPlantTile.innerHTML = "";

    document.getElementById("score").innerHTML = score.toString();
    document.getElementById("timer").innerHTML = `Time Left: ${timeLeft}`;

    // Restart timer
    clearInterval(timerInterval);
    startTimer();
}
