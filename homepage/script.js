// Sample game data array
const games = [
    {
        title: "Tic-Tac-Toe",
        description: "Description of Game 1.",
        imageUrl: "https://www.youcubed.org/wp-content/uploads/2017/03/Tic-Tac-Toe-Product.jpg",
        playUrl: "/games/gameView.html"
    },
    {
        title: "Game 2",
        description: "Description of Game 2.",
        imageUrl: "https://images.fyndiq.se/images/f_auto/t_600x600/prod/bfc0e373d9154484/28c8f4c32151/tic-tac-toe-mini-tic-tac-toe-foam-bradspel-for-barn-birthd",
        playUrl: "/games/snake/snake.html"
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
