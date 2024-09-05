const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');


class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
      const enemies = this.currentRoom.getEnemies();
      enemies.map(enemy => enemy.act());

    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  printStats () {
    console.log(`My health is ${this.health}`);
    console.log(`My strength is ${this.strength}`);

  }

  actionItem(itemName, fromArray, toArray) {
    let itemIndex = fromArray.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        let item = fromArray.splice(itemIndex, 1)[0];
        toArray.push(item);
        this.currentRoom.printRoom();
    }
    
  }

  takeItem(itemName) {

    if (itemName === 'treasure') {
      this.win()
    } else {
      this.actionItem(itemName, this.currentRoom.items, this.items)
    }

  }

  useItem(itemName) {
    if(this.currentRoom.isDark === true || itemName === 'light') {
      this.currentRoom.isDark = false;
      this.currentRoom.description = "You can see, now! Look around!"
      this.actionItem(itemName, this.items, this.currentRoom.items);
    } else {
      this.actionItem(itemName, this.items, this.currentRoom.items); //drops item in room if it's not a light in a dark room
    } 
    
  }

  eatItem(itemName) {
    let selectedItemIndex = this.items.findIndex(item => item.name === itemName);

    if (this.items[selectedItemIndex] instanceof Food) {
        this.items = [...this.items.slice(0, selectedItemIndex), ...this.items.slice(selectedItemIndex + 1)];
        this.health += 5;
        console.log(`You ate your ${itemName}, your health is restored by 5 points! Your health is now ${this.health}. Fight on!`);
    }

  }

  getItemByName(itemName) {
    let item = this.items.find(item => item.name === itemName);
    return item;
  }

  hit(name) {

    if(this.currentRoom.getEnemies().length === 0) {
      console.log("There are no enemies in this room!")
    } else {
      const enemies = this.currentRoom.getEnemies();
      if(enemies.find(enemy => enemy.name === name)) {
        let target = enemies.find(enemy => enemy.name === name);
        target.applyDamage(20);
        target.targetPlayer(this);
      } else {
        console.log("That's not a valid enemy name!");
      }
    }
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

  win() {
    console.log(`You got the treasure! You win! Great job ${this.name}!!`);
    process.exit();
  }

}



module.exports = {
  Player,
};
