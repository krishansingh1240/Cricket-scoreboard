const playButton = document.getElementById("playButton");
const playersContainer = document.getElementById("playersContainer");
const totalRunsElement = document.getElementById("totalRuns");
const totalOversElement = document.getElementById("totalOvers");
const inputQuantity = document.getElementById("quantity");
const addButton = document.getElementById("addButton");

let totalRuns = 0;
let totalBalls = 0;

playButton.addEventListener("click", () => {
    event.preventDefault(); // Prevent form submission and page refresh
    const inputValue = inputQuantity.value;
    inputQuantity.style.display = "none"; // Hide the input box
    playButton.style.display = "none"; // Hide the "Add Players" button
    
    playersContainer.innerHTML = ''; // Clear previous players

    for (let i = 0; i < inputValue; i++) {
        const playerCard = document.createElement("div");
        playerCard.classList.add("player-card");
        playerCard.innerHTML = `
            <input type="text" id="playerName${i + 1}" value="Player ${i + 1}">
            <p>Score: <span id="score${i + 1}">0</span></p>
            <p>Balls: <span id="ballCount${i + 1}">0</span></p>
            <button class="increaseScore" data-increase="0" data-player="${i + 1}">0</button>
            <button class="increaseScore" data-increase="1" data-player="${i + 1}">1</button>
            <button class="increaseScore" data-increase="2" data-player="${i + 1}">2</button>
            <button class="increaseScore" data-increase="3" data-player="${i + 1}">3</button>
            <button class="increaseScore" data-increase="4" data-player="${i + 1}">4</button>
            <button class="increaseScore" data-increase="6" data-player="${i + 1}">6</button>
        `;
        playersContainer.appendChild(playerCard);
    }

    const increaseButtons = document.querySelectorAll('.increaseScore');
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const playerCard = button.closest('.player-card');
            const playerId = button.getAttribute('data-player');
            const scoreSpan = playerCard.querySelector(`#score${playerId}`);
            const ballCountSpan = playerCard.querySelector(`#ballCount${playerId}`);
            let currentScore = parseInt(scoreSpan.textContent);
            const increaseAmount = parseInt(button.getAttribute('data-increase'));
            currentScore += increaseAmount;
            scoreSpan.textContent = currentScore;
            updateBallCount(ballCountSpan, increaseAmount);
        });
    });
});

function updateBallCount(ballCountSpan, increaseAmount) {
    let currentBallCount = parseInt(ballCountSpan.textContent);
    currentBallCount += 1;
    totalBalls += 1;
    ballCountSpan.textContent = currentBallCount;
    
    // Calculate total runs and overs after every ball
    totalRuns += increaseAmount;
    const totalOvers = Math.floor(totalBalls / 6) + (totalBalls % 6) / 10;
    totalRunsElement.textContent = `Total Runs: ${totalRuns}`;
    totalOversElement.textContent = `Total Overs: ${totalOvers.toFixed(1)}`;
}
 