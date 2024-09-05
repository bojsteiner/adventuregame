const chai = require('chai')
  , spies = require('chai-spies');

chai.use(spies);

const should = chai.should()
  , expect = chai.expect;

const {Player} = require("../class/player.js");
const {Room} = require("../class/room.js");
const {Item} = require("../class/item.js");
const {DarkRoom} = require("../class/darkRoom.js");

const {World} = require("../class/world.js");

const {Character} = require("../class/character.js");
const {Enemy} = require("../class/enemy.js");

describe("DarkRoom", () => {
    let player;
    let darkRoom;
    let item;
    let light;
    let enemy;

    beforeEach(function() {
        darkRoom =  new DarkRoom("Test Room");
        item = new Item("rock", "just a simple rock");
        light = new Item("light", "a light for the dark")
        player = new Player('Character', 'an ordinary character', darkRoom);
        enemy = new Enemy('Boogey', 'Boo', darkRoom)
        World.enemies = [enemy];
        player.items.push(light);
        darkRoom.items.push(item);
      });

    it("should have name and description attributes", () => {
        expect(darkRoom.name).to.equal("Test Room");
        expect(darkRoom.description).to.equal("It's so dark in here, you can't see anything.");
    }); 

    it("should have an isDark attribute initially set to true", () => {
        expect(darkRoom.isDark).to.be.true;
    });  

    it("should inherit from the Room class", () => {
        expect(darkRoom instanceof Room).to.be.true;
        expect(darkRoom instanceof DarkRoom).to.be.true;
    });  

    it("should not show items or enemies unless a light item is used", () => {
        const spy = chai.spy.on(console, 'log');
        darkRoom.printRoom();
        expect(spy).to.have.been.called.with("It's so dark in here, you can't see anything.");
        spy.__spy.calls.forEach(call => {
            expect(call[0]).to.not.match(/^Items:/);
            expect(call[0]).to.not.match(/^Enemies:/);
        });

        chai.spy.restore(console, 'log');  
    }); 

    it("should show items or enemies when a light item is used", () => {
        const spy = chai.spy.on(darkRoom, "super.PrintRoom()");
        player.useItem(light);
        darkRoom.printRoom();
        expect(spy).to.have.been.called;
        darkRoom.printRoom();
    }); 


});

// darkRoom =  new DarkRoom("Test Room", "It's so dark in here, you can't see anything.");
// item = new Item("rock", "just a simple rock");
// light = new Item("light", "a light for the dark")
// player = new Player('Player 1', darkRoom);
// enemy = new Enemy('Boogey', 'Boo', darkRoom)
// World.enemies = [enemy];
// player.items.push(light);
// darkRoom.items.push(item);
// darkRoom.printRoom();
// console.log(player.items);
// console.log(player.currentRoom);
// player.useItem("light");
// console.log(player.items);
// console.log(player.currentRoom);
// setTimeout(darkRoom.printRoom.bind(darkRoom),5000);

