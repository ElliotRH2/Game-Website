// Sample game data array
const games = [
    {
        title: "Tic-Tac-Toe",
        description: "Classic Tic-Tac-Toe",
        imageUrl: "https://www.shutterstock.com/shutterstock/videos/1103397077/thumb/1.jpg?ip=x480",
        playUrl: "/games/gameView.html"
    },
    {
        title: "Flappy Bird",
        description: "Classic Flappy Bird",
        imageUrl: "https://w0.peakpx.com/wallpaper/795/210/HD-wallpaper-flappy-bird-game.jpg",
        playUrl: "/games/flappyBird/flappy.html"
    },
];

// Function to generate game cards
function generateGameCards() {
    const container = document.getElementById("game-cards-container");

    games.forEach(game => {
        const card = document.createElement("div");
        card.classList.add("game-card");

        card.innerHTML = `
            <img src="${game.imageUrl}" alt="${game.title}">
            <div class="game-info">
                <h2>${game.title}</h2>
                <p>${game.description}</p>
                <a href="${game.playUrl}">Play Now</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Call the function to generate game cards
generateGameCards();
