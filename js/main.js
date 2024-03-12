// // Define a Player class to represent each player
// class Player {
//     constructor(name, color) {
//       this.name = name;
//       this.color = color;
//     }
//   }
  
//   // Define a ConnectFourGame class to manage the game state and logic
//   class ConnectFourGame {
//     constructor(rows = 6, cols = 7) {
//       this.rows = rows;
//       this.cols = cols;
//       this.board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));
//       this.currentPlayer = null;
//       this.players = [];
//     }
  
//     addPlayer(player) {
//       this.players.push(player);
//     }
  
//     switchPlayer() {
//       this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
//     }
  
//     dropDisc(column) {
//       for (let row = this.rows - 1; row >= 0; row--) {
//         if (this.board[row][column] === null) {
//           this.board[row][column] = this.currentPlayer.color;
//           return true;
//         }
//       }
//       return false;
//     }
  
//     checkWinner() {
//       const directions = [
//         [0, 1], // horizontal
//         [1, 0], // vertical
//         [1, 1], // diagonal (right)
//         [-1, 1], // diagonal (left)
//       ];
  
//       for (let row = 0; row < this.rows; row++) {
//         for (let col = 0; col < this.cols; col++) {
//           if (this.board[row][col] !== null) {
//             for (const [dr, dc] of directions) {
//               let count = 1;
//               for (let i = 1; i < 4; i++) {
//                 const r = row + dr * i;
//                 const c = col + dc * i;
//                 if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === this.board[row][col]) {
//                   count++;
//                   if (count === 4) {
//                     return true;
//                   }
//                 } else {
//                   break;
//                 }
//               }
//             }
//           }
//         }
//       }
//       return false;
//     }
//   }
  
//   // Example usage
//   const game = new ConnectFourGame();
//   const player1 = new Player("Player 1", "red");
//   const player2 = new Player("Player 2", "yellow");
//   game.addPlayer(player1);
//   game.addPlayer(player2);
  
//   game.currentPlayer = player1; // Start with player 1
  
//   // This part can be integrated with an HTML/CSS interface for user interaction
//   while (true) {
//     const column = prompt(`${game.currentPlayer.name}'s turn. Choose a column (0-${game.cols - 1}):`);
//     if (column === null) break; // Allow the user to cancel the game
//     if (isNaN(column) || column < 0 || column >= game.cols) {
//       alert("Invalid column number. Please try again.");
//       continue;
//     }
//     if (game.dropDisc(parseInt(column))) {
//       if (game.checkWinner()) {
//         alert(`${game.currentPlayer.name} wins!`);
//         break;
//       }
//       game.switchPlayer();
//     } else {
//       alert("Column is full. Please try again.");
//     }
//   }
  