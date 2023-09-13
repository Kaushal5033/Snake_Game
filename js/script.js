// Game constants and variables
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('music/foodsound.mp3');
const gameoversound = new Audio('music/gameover.mp3');
const movesound = new Audio('music/move.mp3');
const musicsound = new Audio('music/gamemusic.mp3');
let speed = 11;
let lastpainttime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 10, y: 8 }; // Added "let" keyword
let score = 0;

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime;
    gameengine();
}

function iscollide(snake) {
    //If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true ;
        }
        
    }
    // If you bump into the wall of the container
    if (snake[0].x>=50||snake[0].x<=0 || snake[0].y>=18||snake[0].y<=0) {
        return true ;
    }
    return false;
}

function gameengine() {
    // PART1 - Updating the snake food and array
    if (iscollide(snakeArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("GAME OVER. PRESS ANY KEY TO PLAY AGAIN!");
        snakeArr = [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;
    }

    // If you have eaten food, then increment the score and add the food at a new place
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score += 5;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y }); // Corrected syntax
        let a = 1;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }; // Added "y" coordinate
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // PART2 - Display the food and snake
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Main logic of the game starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; // Start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight"); // Corrected key name
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
