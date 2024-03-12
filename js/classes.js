class Piece {
    constructor(
        color,
    ) {
        this.color = color;
        this.element = document.createElement('div');
        this.element.classList.add('piece');
        this.element.style.backgroundColor = color;
    }
}

class Player{
    constructor(
        name,
        color,
    ) {
        this.name = name;
        this.color = color;
    }
}

export { Piece, Player }; 
