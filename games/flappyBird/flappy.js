// Board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

const canvas = document.getElementById("board")

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = 
{
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
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
let velocityX  = -2; // Pipes moving left
let velocityY = 0; // Bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() 
{   
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // Used for drawing on the board

    // Load images
    birdImg = new Image();
    birdImg.src = "./flappyPng/flappybird.png";
    
    birdImg.onload = function()
    {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);  
    }

    topPipeImg = new Image();
    topPipeImg.src = "./flappyPng/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./flappyPng/bottompipe.png"

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); // Every 1.5 seconds

    document.addEventListener("keydown", moveBird);
    document.addEventListener("click", clickMoveBird);
}

function update()
{
    requestAnimationFrame(update);

    if (gameOver) 
    {
        return;
    }

    if (bird.y > board.height) 
    {
        gameOver = true;
    }

    context.clearRect(0, 0, board.width, board.height);

    // Bird
    velocityY += gravity;
    //bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0);   
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height); 
    
    // Pipes
    for (let i = 0; i< pipeArray.length; i++) 
    {
        let pipe = pipeArray[i];
        pipe.x += velocityX; // Move pipes 
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) // If pipePassed is false and our bird is over the x position of the pipe, then we passed a pipe
        {
            // Give score when we passed a pipe
            score+= 0.5; // 0.5 since we have two pipes(bottom & top) checking if we pass so we get +1 if we pass a set of pipes
            pipe.passed = true;
        }

        // Use the detectCollision function and pass bird and pipe object to detect collision
        if (detectCollision(bird, pipe))
        {
            gameOver = true;
        }
    }

    // Clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) // When the first pipe in the pipe array is outside the left side of the screen
    {
        pipeArray.shift(); // Removes first element in the array
        console.log("pipe removed")
    }

    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45)

    if (gameOver)
    {
        context.fillText("Game Over", 5, 90);
    }
}

function placePipes()
{
    if (gameOver) 
    {
        return;
    }

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe =
    {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let bottomPipe = 
    {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(bottomPipe);
}

function moveBird(e) 
{

    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") 
    {
        // Jump
        velocityY = -6; // Negative value to make the bird go up
    }

    if (gameOver)
    {
        // Reset game properties and pipe array when game over
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
    }
}

// For clicking screen to jump (mostly for phone)
function clickMoveBird(event)
{

    velocityY = -6; 

    if (gameOver)
    {
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
    }
}

// Function to detect collision between objects
function detectCollision(a, b)
{           // Check if two objects are overlapping horizontally
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&

            // Check if two objects are overlapping vertically
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}


