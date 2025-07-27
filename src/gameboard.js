class Gameboard {
    constructor() {
      this.ships = [];
      this.missedAttacks = [];
    }
    
    placeShip(ship, coordinates, direction) {

        const shipPlacement = {
            ship: ship,
            startCoordinate: coordinates,
            direction: direction
        };

        this.ships.push(shipPlacement);
    }

    receiveAttack(coordinates) {
        for (let shipPlacement of this.ships) {
            const shipCoords = this.getShipCoordinates(shipPlacement);
            
            for (let shipCoord of shipCoords) {
                if (shipCoord[0] === coordinates[0] && shipCoord[1] === coordinates[1]) {
                    shipPlacement.ship.hit();
                    return 'hit';
                }
            }
        }
        
        this.missedAttacks.push(coordinates);
        return 'miss';
    }

    getShipCoordinates(shipPlacement) {
        const coords = [];
        const [startX, startY] = shipPlacement.startCoordinate;
        
        for (let i = 0; i < shipPlacement.ship.length; i++) {
            if (shipPlacement.direction === 'horizontal') {
                coords.push([startX + i, startY]);
            } else {
                coords.push([startX, startY + i]);
            }
        }
        
        return coords;
    }

    allShipsSunk() {
        if (this.ships.length === 0) {
            return false;
        }
        
        for (let shipPlacement of this.ships) {
            if (!shipPlacement.ship.isSunk()) {
                return false;
            }
        }
        
        return true;
    }
}