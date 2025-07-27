const Player = require('../src/player.js');
const Ship = require('../src/ship.js');

test('player should be created with correct type and own gameboard', () => {
    const realPlayer = new Player('real');
    const computerPlayer = new Player('computer');
    
    expect(realPlayer.type).toBe('real');
    expect(computerPlayer.type).toBe('computer');
    
    expect(realPlayer.gameboard).toBeDefined();
    expect(computerPlayer.gameboard).toBeDefined();
    
    expect(realPlayer.gameboard).not.toBe(computerPlayer.gameboard);
});

test('player should be able to place ships on their gameboard', () => {
    const player = new Player('real');
    const destroyer = new Ship(3);
    
    player.gameboard.placeShip(destroyer, [2, 3], 'horizontal');
    
    expect(player.gameboard.ships.length).toBe(1);
    expect(player.gameboard.ships[0].ship).toBe(destroyer);
});

test('players should have independent gameboards', () => {
    const player1 = new Player('real');
    const player2 = new Player('computer');
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    
    player1.gameboard.placeShip(ship1, [0, 0], 'horizontal');
    player2.gameboard.placeShip(ship2, [5, 5], 'vertical');
    
    expect(player1.gameboard.ships.length).toBe(1);
    expect(player2.gameboard.ships.length).toBe(1);
    expect(player1.gameboard.ships[0].ship).toBe(ship1);
    expect(player2.gameboard.ships[0].ship).toBe(ship2);
});

test('player should be able to attack enemy gameboard', () => {
    const player1 = new Player('real');
    const player2 = new Player('computer');
    const ship = new Ship(2);
    
    player2.gameboard.placeShip(ship, [0, 0], 'horizontal');
    
    const result = player1.attack([0, 0], player2.gameboard);
    
    expect(result).toBe('hit');
    expect(ship.hits).toBe(1);
});

test('computer player should be able to make random attacks', () => {
    const computerPlayer = new Player('computer');
    const humanPlayer = new Player('real');
    const ship = new Ship(3);
    
    humanPlayer.gameboard.placeShip(ship, [0, 0], 'horizontal');
    
    const result = computerPlayer.makeRandomAttack(humanPlayer.gameboard);
    
    expect(result === 'hit' || result === 'miss').toBe(true);
});

test('real player should not be able to make random attacks', () => {
    const realPlayer = new Player('real');
    const computerPlayer = new Player('computer');
    
    expect(() => {
        realPlayer.makeRandomAttack(computerPlayer.gameboard);
    }).toThrow('Only computer players can make random attacks');
});

test('computer should not attack the same coordinates twice', () => {
    const computerPlayer = new Player('computer');
    const humanPlayer = new Player('real');
    
    const attackedCoords = [];
    
    for (let i = 0; i < 10; i++) {
        computerPlayer.makeRandomAttack(humanPlayer.gameboard);
    }
    
    const uniqueCoords = new Set(computerPlayer.attackedCoordinates.map(coord => `${coord[0]},${coord[1]}`));
    
    expect(uniqueCoords.size).toBe(computerPlayer.attackedCoordinates.length);
    expect(computerPlayer.attackedCoordinates.length).toBe(10);
});