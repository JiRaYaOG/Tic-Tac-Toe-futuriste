const cells = document.querySelectorAll(".cell");
const playerTurnText = document.getElementById("playerTurn");
const winnerText = document.getElementById("winner");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Fonction pour vérifier le gagnant
function checkWinner() {
  for (const combo of winningCombos) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      winnerText.textContent = `🎉 ${board[a]} gagne !`;
      winnerText.classList.remove("hidden");
      winnerText.classList.add("winner-glow");
      return;
    }
  }
  if (!board.includes("")) {
    gameOver = true;
    winnerText.textContent = "⚡ Égalité !";
    winnerText.classList.remove("hidden");
    winnerText.classList.add("winner-glow");
  }
}

// Événement sur chaque case
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.dataset.index;
    if (board[index] !== "" || gameOver) return;

    board[index] = currentPlayer;
    cell.classList.add(currentPlayer);

    checkWinner();

    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      playerTurnText.textContent = `Tour de : ${currentPlayer}`;
    }
  });
});

// Bouton Recommencer
resetBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X","O");
  });
  currentPlayer = "X";
  gameOver = false;
  playerTurnText.textContent = `Tour de : ${currentPlayer}`;
  winnerText.classList.add("hidden");
  winnerText.classList.remove("winner-glow");
});
