class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
        this.attackedCoordinates = [];
    }

    attack(coordinates, enemyGameboard) {
        return enemyGameboard.receiveAttack(coordinates);
    }

    makeRandomAttack(enemyGameboard) {
        if (this.type !== 'computer') {
            throw new Error('Only computer players can make random attacks');
        }
        
        const availableCoords = [];
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const coord = [row, col];
                if (!this.hasAttackedCoordinate(coord)) {
                    availableCoords.push(coord);
                }
            }
        }
        
        if (availableCoords.length === 0) {
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * availableCoords.length);
        const coordinates = availableCoords[randomIndex];
        
        this.attackedCoordinates.push(coordinates);
        
        return this.attack(coordinates, enemyGameboard);
    }

    hasAttackedCoordinate(coordinates) {
        for (let attackedCoord of this.attackedCoordinates) {
            if (attackedCoord[0] === coordinates[0] && attackedCoord[1] === coordinates[1]) {
                return true;
            }
        }
        return false;
    }
    
    reset() {
        this.attackedCoordinates = [];
        this.gameboard = new Gameboard();
    }
}