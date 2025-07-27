const Gameboard = require('../src/gameboard.js');
const Ship = require('../src/ship.js');


test('gameboard should hit ship when attack coordinates match ship position', () => {
    const gameboard = new Gameboard();
    const destroyer = new Ship(3);
    
    gameboard.placeShip(destroyer, [2, 3], 'horizontal');
    
    gameboard.receiveAttack([3, 3]);
    
    expect(destroyer.hits).toBe(1);
    expect(gameboard.missedAttacks.length).toBe(0);
});

test('gameboard should record missed attacks when no ship is hit', () => {
    const gameboard = new Gameboard();
    const destroyer = new Ship(3);
    
    gameboard.placeShip(destroyer, [2, 3], 'horizontal');
    
    gameboard.receiveAttack([5, 5]);
    
    expect(destroyer.hits).toBe(0);
    expect(gameboard.missedAttacks.length).toBe(1);
    expect(gameboard.missedAttacks[0]).toEqual([5, 5]);
});

test('allShipsSunk should return true when no ships are placed', () => {
    const gameboard = new Gameboard();
    expect(gameboard.allShipsSunk()).toBe(true);
});

test('allShipsSunk should return false when some ships are not sunk', () => {
    const gameboard = new Gameboard();
    const destroyer = new Ship(2);
    
    gameboard.placeShip(destroyer, [0, 0], 'horizontal');
    gameboard.receiveAttack([0, 0]);
    
    expect(gameboard.allShipsSunk()).toBe(false);
});

test('allShipsSunk should return true when all ships are sunk', () => {
    const gameboard = new Gameboard();
    const destroyer = new Ship(2);
    
    gameboard.placeShip(destroyer, [0, 0], 'horizontal');
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 0]);
    
    expect(gameboard.allShipsSunk()).toBe(true);
});