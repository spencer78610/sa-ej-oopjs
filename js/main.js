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

let currentPlayerIndex = 0;

const draggablePiece = document.querySelector('.draggable-piece');
const gameBoard = document.querySelector('.grid');

draggablePiece.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', 'piece');
});

gameBoard.addEventListener('dragover', (event) => {
  event.preventDefault();
});

gameBoard.addEventListener('drop', (event) => {
  event.preventDefault();
  const droppedCell = event.target; 

  if (droppedCell.classList.contains('cell')) {
    const newPiece = document.createElement('div');
    newPiece.classList.add('piece');

    const droppedPieceColor = playerColors[currentPlayerIndex];

    const draggablePieceColor = playerColors[(currentPlayerIndex + 1) % playerColors.length];

    draggablePiece.style.backgroundColor = draggablePieceColor;
    newPiece.style.backgroundColor = droppedPieceColor;

    droppedCell.appendChild(newPiece);

    currentPlayerIndex = (currentPlayerIndex + 1) % playerColors.length;
  }
});
