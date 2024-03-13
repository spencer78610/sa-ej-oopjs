import { Piece, Player } from "./classes.js"; 

const player1 = new Player(
    'Player 1', 
    'red'
);
const player2 = new Player(
    'Player 2', 
    'yellow'
);

const piecePlayer1 = new Piece(player1.color);
const piecePlayer2 = new Piece(player2.color);

const playerColors = ['red', 'yellow']; 
// Initialize the game board array
const board = Array.from({ length: 6 }, () => Array(7).fill(null));

let currentPlayerIndex = 0;

const draggablePiece = document.querySelector('.draggable-piece');
const gameBoard = document.querySelector('.grid');

draggablePiece.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', 'piece');
});

gameBoard.addEventListener('dragover', (event) => {
  event.preventDefault();
});

// Add this function to check for a win condition
function checkForWin(board, color) {
  // Check horizontal
  for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
          if (
              board[row][col] === color &&
              board[row][col + 1] === color &&
              board[row][col + 2] === color &&
              board[row][col + 3] === color
          ) {
              return true;
          }
      }
  }

  // Check vertical
  for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
          if (
              board[row][col] === color &&
              board[row + 1][col] === color &&
              board[row + 2][col] === color &&
              board[row + 3][col] === color
          ) {
              return true;
          }
      }
  }

  // Check diagonal (from bottom-left to top-right)
  for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
          if (
              board[row][col] === color &&
              board[row - 1][col + 1] === color &&
              board[row - 2][col + 2] === color &&
              board[row - 3][col + 3] === color
          ) {
              return true;
          }
      }
  }

  // Check diagonal (from top-left to bottom-right)
  for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
          if (
              board[row][col] === color &&
              board[row + 1][col + 1] === color &&
              board[row + 2][col + 2] === color &&
              board[row + 3][col + 3] === color
          ) {
              return true;
          }
      }
  }

  return false;
}

let gameEnded = false; 

const dropSound = new Audio('audio/click.mp3');
const winSound = new Audio('audio/tada.mp3');

gameBoard.addEventListener('drop', (event) => {
    event.preventDefault();

    if (gameEnded) return; // If the game has ended, exit the function

    const droppedCell = event.target;

    if (droppedCell.classList.contains('cell')) {
        // Determine the current player's color
        const currentPlayerColor = playerColors[currentPlayerIndex];

        // Get the column of the dropped cell
        const col = parseInt(droppedCell.dataset.col);

        // Find the bottom-most empty cell in the column
        let row = 5; // Start from the bottom row
        while (row >= 0 && board[row][col] !== null) {
            row--; // Move up until an empty cell is found
        }

        if (row >= 0) {
            // Update the game board array with the current player's color
            board[row][col] = currentPlayerColor;

            // Play the drop sound effect
            dropSound.play();

            // If no win, update the UI and switch players
            const newPiece = document.createElement('div');
            newPiece.classList.add('piece');
            newPiece.style.backgroundColor = currentPlayerColor;

            // Update the dropped cell to the bottom-most empty cell
            const targetCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            targetCell.appendChild(newPiece);

            // Check for a win condition
            if (checkForWin(board, currentPlayerColor)) {
                document.getElementById('winner').innerText = `${currentPlayerColor.toUpperCase()} wins!`;
                winSound.play();
                gameEnded = true; // Set gameEnded to true to prevent further moves
                return; // Exit the function to prevent further moves
            }

            // If no win, switch players
            currentPlayerIndex = (currentPlayerIndex + 1) % playerColors.length;
        }
    }
});
