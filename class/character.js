class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.health = 100;
    this.strength = 10;
    this.items = [];
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    } else {
      console.log(`${this.name} was hit! Their health is now ${this.health}.`);
    }
  }

  die() {
    console.log(`${this.name} took too many hits and is no longer in the game.`)
    this.currentRoom.items.push(...this.items);
    this.currentRoom.printRoom();
    this.items = [];
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
