const cells = document.querySelectorAll(".cell");
const playerTurnText = document.getElementById("playerTurn");
const winnerText = document.getElementById("winner");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8], // lignes
  [0,3,6],[1,4,7],[2,5,8], // colonnes
  [0,4,8],[2,4,6]          // diagonales
];

function checkWinner() {
  for (const combo of winningCombos) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      winnerText.textContent = `🎉 ${board[a]} gagne !`;
      winnerText.classList.remove("hidden");
      return;
    }
  }
  if (!board.includes("")) {
    gameOver = true;
    winnerText.textContent = "⚡ Égalité !";
    winnerText.classList.remove("hidden");
  }
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.dataset.index;
    if (board[index] !== "" || gameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();

    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      playerTurnText.textContent = `Tour de : ${currentPlayer}`;
    }
  });
});

resetBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameOver = false;
  playerTurnText.textContent = `Tour de : ${currentPlayer}`;
  winnerText.classList.add("hidden");
});
