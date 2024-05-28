// Board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

const canvas = document.getElementById("board");

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = 
{
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

// Pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// Physics
let velocityX = -150; // Pipes moving left in pixels per second
let velocityY = 0; // Bird jump speed in pixels per second
let gravity = 1000; // Gravity in pixels per second squared

let gameOver = false;
let score = 0;

// For capping the fps at 60 and checking frames, this is to make the game work consistent using monitors with more hertz
const fps = 60;
const timeStep = 1000 / fps; // 16.67ms for 60fps
let lastTimestamp = 0;
let accumulatedTime = 0;

window.onload = function() 
{
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // Used for drawing on the board

    // Load images
    birdImg = new Image();
    birdImg.src = "./flappyPng/flappybird.png";
    
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./flappyPng/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./flappyPng/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); // Every 1.5 seconds

    document.addEventListener("keydown", moveBird);
    document.addEventListener("click", clickMoveBird);
}

function update(timestamp) 
{
    // Used to initialize the first frame, in the start it will be undefined so we check when its true
    if (!lastTimestamp) 
    {
        lastTimestamp = timestamp;
    }

    let deltaTime = timestamp - lastTimestamp; // Calculate difference in time between the current and previous frame and store it in variable deltaTime
    lastTimestamp = timestamp; // Save the last frame and use it for next frame
    accumulatedTime += deltaTime; // Add the difference (in ms) to accumulated time 

    // Only update the game when accumulated time is 16.67 ms or more making it only update in 60 fps
    while (accumulatedTime >= timeStep) 
    {
        gameLoop(timeStep / 1000); // Convert timeStep to seconds
        accumulatedTime -= timeStep; // Remove 16.67 ms per frame from accumulatedTime
    }

    requestAnimationFrame(update); 
}

function gameLoop(deltaTime) 
{
    if (gameOver) 
    {
        context.fillText("Game Over", 5, 90);
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    // Bird
    velocityY += gravity * deltaTime;
    bird.y = Math.max(bird.y + velocityY * deltaTime, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > boardHeight) 
    {
        gameOver = true;
    }

    // Pipes
    for (let i = 0; i < pipeArray.length; i++) 
    {
        let pipe = pipeArray[i];
        pipe.x += velocityX * deltaTime;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) 
        {
            score += 0.5;
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) 
        {
            gameOver = true;
        }
    }

    // Clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) 
    {
        pipeArray.shift();
        console.log("pipe removed");
    }

    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);
}

function placePipes() 
{
    if (gameOver) 
    {
        return;
    }

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;

    let topPipe = 
    {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe);

    let bottomPipe = 
    {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") 
    {
        // Jump
        velocityY = -350; // Adjust this value to get the desired jump height
    }

    if (gameOver) 
    {
        bird.y = birdY;
        pipeArray = [];
        score = 0;  
        gameOver = false;
        velocityY = 0;
        lastTimestamp = 0; // Reset the timestamp for a new game
    }
}

function clickMoveBird(event) 
{
    velocityY = -350; // Adjust this value to get the desired jump height

    if (gameOver) 
    {
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
        velocityY = 0;
        lastTimestamp = 0; // Reset the timestamp for a new game
    }
}

function detectCollision(a, b) 
{
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}