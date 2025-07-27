const GameModule = require('../src/gameModule.js');
const Ship = require('../src/ship.js');

test('gameModule should start a new game', () => {
    const gameModule = new GameModule();
    const game = gameModule.startNewGame();
    
    expect(game).toBeDefined();
    expect(game.humanPlayer).toBeDefined();
    expect(game.computerPlayer).toBeDefined();
    expect(gameModule.getCurrentPlayer()).toBe('real');
    expect(gameModule.isGameOver()).toBe(false);
});

test('gameModule should handle human attacks', () => {
    const gameModule = new GameModule();
    const game = gameModule.startNewGame();
    
    const computerShip = new Ship(2);
    const humanShip = new Ship(3);
    
    game.computerPlayer.gameboard.placeShip(computerShip, [0, 0], 'horizontal');
    game.humanPlayer.gameboard.placeShip(humanShip, [5, 5], 'horizontal');
    
    const result = gameModule.processHumanTurn([0, 0]);
    
    expect(result).toBe('hit');
    expect(computerShip.hits).toBe(1);
});

test('gameModule should prevent attacks when no game exists', () => {
    const gameModule = new GameModule();
    
    const result = gameModule.processHumanTurn([0, 0]);
    
    expect(result).toBeUndefined();
});