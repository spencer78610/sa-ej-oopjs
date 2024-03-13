export function titleScreen() {
        const titleScreen = document.querySelector('.title-screen');
        const gameBoard = document.querySelector('.title-board');
        const statusBoard = document.querySelector('.status');
        const startButton = document.querySelector('#start-button');

    startButton.addEventListener('click', function () {
        titleScreen.style.display = 'none'; 
        gameBoard.style.display = 'inline-block'; 
        statusBoard.style.display = 'flex';
    });


}


