let typedText; 
let startTime;
let endTime;

const displayText = document.getElementById("displayText");
const inputField = document.getElementById("inputField");
const textToType = document.getElementById("textToType");
const wpmDisplay = document.getElementById("wpmDisplay");
const newGame = document.getElementById("newGame");
const randomMode = document.getElementById("randomMode")
const fixedMode = document.getElementById("fixedMode")

// Set starting values
let isRandomMode = "random"

// Get a new text at start
resetGame();

// Set colors button colors at start
randomMode.style.backgroundColor = "rgb(101, 255, 74)"
fixedMode.style.backgroundColor = "rgb(255, 43, 43)"

// Toggle mode buttons
fixedMode.addEventListener("click", function() 
{
    if (isRandomMode !== "fixed") 
    { 
        isRandomMode = "fixed"
        fixedMode.style.backgroundColor = "rgb(101, 255, 74)"
        randomMode.style.backgroundColor = "rgb(255, 43, 43)"
    }
});

randomMode.addEventListener("click", function() 
{
    if (isRandomMode !== "random") 
    { 
        isRandomMode = "random"
        randomMode.style.backgroundColor = "rgb(101, 255, 74)"
        fixedMode.style.backgroundColor = "rgb(255, 43, 43)"
    }
});

// When we type in the input field
inputField.addEventListener("input", function() 
{
    // Start the timer only at the first time we input text
    if (!startTime) 
    {
        startTimer();
        console.log("timer started");
    }

    // The text we type in the input field is stored in the typedText variable
    typedText = inputField.value;

   const greenColor = "rgb(101, 255, 74)"
   const redColor = "rgb(255, 43, 43)"

    const originalText = textToType.innerText;
    let formattedText = "";

    // Change color of letter if typedText is matching with the textToType 
    for (let i = 0; i < originalText.length; i++) 
    {
        if (typedText[i] === originalText[i]) 
        {
            formattedText += `<span style="color: ${greenColor};">${originalText[i]}</span>`;
        } 
        else 
        {
            formattedText += `<span style="color: ${redColor};">${originalText[i]}</span>`;
        }
    }   

    textToType.innerHTML = formattedText;
    
    // When typedText is the same as textToType we end the timer and calculate wpm with endGame function
    if (typedText === textToType.innerText) 
    {
        endTimer();
        endGame();
    }
})

function resetGame() 
{
    // Make a new text depending on what mode you are playing
    if (isRandomMode === "random")
    {
        // Method to generate random sentences by picking a random word in every array and returning them
        function generateRandomSentence() 
        {
            const subjects = ["The cat", "A dog", "An elephant", "My friend", "A bird", "A person"];
            const verbs = ["runs", "jumps", "sleeps", "eats", "flies", "draws"];
            const objects = ["the ball", "a book", "a banana", "the sky", "a tree", "a table"];
        
            const subject = subjects[Math.floor(Math.random() * subjects.length)];
            const verb = verbs[Math.floor(Math.random() * verbs.length)];
            const object = objects[Math.floor(Math.random() * objects.length)];
    
            return `${subject} ${verb} ${object}.`;
        }

        // Combine three random sentences for a longer text
        const randomSentence = generateRandomSentence() + " " + generateRandomSentence() + " " + generateRandomSentence();
        textToType.innerHTML = randomSentence;
    }
    else
    {
        // Pre-made sentences depending on the players preference
        const sentencesToType = [
            "The quick brown fox jumps over the lazy dog.",
            "A journey of a thousand miles begins with a single step.",
            "In the end, it's not the years in your life that count. It's the life in your years.",
            "Success is not final, failure is not fatal: It is the courage to continue that counts.",
            "Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.",
            "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
            "Life is what happens when you're busy making other plans.",
            "Believe you can and you're halfway there.",
            "The only way to do great work is to love what you do.",
            "I have not failed. I've just found ways that won't work.",
            "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            "The only limit to our realization of tomorrow will be our doubts of today.",
            "Change your thoughts and you change your world.",
            "Happiness is not something readymade. It comes from your own actions.",
            "It does not matter how slowly you go as long as you do not stop.",
            "The best way to predict the future is to create it.",
            "In the midst of winter, I found there was, within me, an invincible summer."
        ];
        
        // Pick a random sentece from the array
        function getRandomSentence() 
        {
            return sentencesToType[Math.floor(Math.random() * sentencesToType.length)];
        }
        
        const randomSentence = getRandomSentence();
        textToType.innerText = randomSentence; 
    }

    // Reset all values and text
    displayText.innerText = "Type the following text:";
    displayText.style.color = "white"
    inputField.value = "";
    wpmDisplay.innerText = ""

    startTime = null;
    endTime = null;
    wpm = 0;
    wordCount = 0;

    inputField.blur();
}

function endGame()
{
    // When done typing the text, get time and calculate wpm and display it on screen
    console.log("Timer ended");
    const words = textToType.innerText.trim().split(/\s+/);
    const wordCount = words.length;
    const elapsedTime = endTime - startTime; 
    const seconds = Math.floor(elapsedTime / 1000); 
    console.log(`Elapsed time: ${seconds} seconds`); 
    console.log("Words typed: " + wordCount)
    const wpm = Math.floor((wordCount / seconds) * 60);
    console.log(wpm);
    wpmDisplay.innerText = "WPM: " + wpm;
}

function startTimer() 
{
    startTime = new Date().getTime(); 
}

function endTimer() 
{
    endTime = new Date().getTime(); 
}

newGame.addEventListener("click", function()
{
    resetGame();
})

