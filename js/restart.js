export function restartButton() {
    const restartButton = document.querySelector('.status button');
    const dropSound = new Audio('audio/click.mp3');

    restartButton.addEventListener('click', function() {
        // Reload the page
        dropSound.play();
        location.reload();
    });
    
    


}