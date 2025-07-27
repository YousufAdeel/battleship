class Game {
    constructor() {
        this.humanPlayer = new Player('real');
        this.computerPlayer = new Player('computer');
        this.currentPlayer = this.humanPlayer;
        this.gameOver = false;
    }

    switchTurn() {
        this.currentPlayer = this.currentPlayer === this.humanPlayer 
            ? this.computerPlayer 
            : this.humanPlayer;
    }

    playTurn(coordinates) {
        if (this.gameOver) {
            return 'game over';
        }

        let result;
        
        if (this.currentPlayer === this.humanPlayer) {
            if (!coordinates) {
                return 'need coordinates for human player';
            }
            result = this.humanPlayer.attack(coordinates, this.computerPlayer.gameboard);
        } 
        else {
            result = this.computerPlayer.makeRandomAttack(this.humanPlayer.gameboard);
            if (result === null) {
                return 'no moves left';
            }
        }

        if (this.computerPlayer.gameboard.allShipsSunk()) {
            this.gameOver = true;
            return 'human wins';
        }
        if (this.humanPlayer.gameboard.allShipsSunk()) {
            this.gameOver = true;
            return 'computer wins';
        }

        this.switchTurn();
        return result;
    }
    
    getCurrentPlayerType() {
        return this.currentPlayer.type;
    }
    
    reset() {
        this.humanPlayer.reset();
        this.computerPlayer.reset();
        this.currentPlayer = this.humanPlayer;
        this.gameOver = false;
    }
}