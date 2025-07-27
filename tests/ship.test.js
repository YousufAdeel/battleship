const Ship = require('../src/ship.js');

test('ship should be created with correct length and zero hits', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
});

test('ship should increase hits when hit() is called', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
});

test('ship should not be sunk initially', () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);
});

test('ship should be sunk when hits equal length', () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});