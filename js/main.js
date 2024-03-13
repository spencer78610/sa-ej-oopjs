import { Piece, Player } from "./classes.js";
import { restartButton } from "./restart.js";
import { titleScreen } from "./title-screen.js"; 

titleScreen();
restartButton();

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

let currentPlayerColor = playerColors[currentPlayerIndex];

gameBoard.addEventListener('drop', (event) => {
    event.preventDefault();

    if (gameEnded) return; 

    const droppedCell = event.target;

    if (droppedCell.classList.contains('cell')) {
        const col = parseInt(droppedCell.dataset.col);

        let row = 5; 
        while (row >= 0 && board[row][col] !== null) {
            row--; 
        }

        if (row >= 0) {
            board[row][col] = currentPlayerColor;
            dropSound.play();

            const newPiece = document.createElement('div');
            newPiece.classList.add('piece');
            newPiece.style.backgroundColor = currentPlayerColor;

            const targetCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            targetCell.appendChild(newPiece);

            // Check for a win condition
            if (checkForWin(board, currentPlayerColor)) {
                document.querySelector('.winner').innerText = `${currentPlayerColor.toUpperCase()} wins!`;
                winSound.play();
                gameEnded = true; 
                return; 
            }

            // Switch players
            currentPlayerIndex = (currentPlayerIndex + 1) % playerColors.length;
            currentPlayerColor = playerColors[currentPlayerIndex];

            draggablePiece.style.backgroundColor = currentPlayerColor;
        }
    }
});
