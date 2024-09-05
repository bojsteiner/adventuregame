const {Character} = require('./character');
const {Room} = require('./room');



class Enemy extends Character {
  constructor(name, description, startingRoom) {
    super(name, description, startingRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }



  randomMove() {
    const directions = this.currentRoom.getExits();
    let randomDirection = directions[Math.floor(Math.random() * directions.length )];
    const nextRoom = this.currentRoom.getRoomInDirection(randomDirection);
    this.currentRoom = nextRoom;
    this.cooldown += 1000;

  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }


  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown.bind(this), this.cooldown);
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();

    } else {
      this.scratchNose();
      this.randomMove();
    }

  }

  scratchNose() {
    this.alert(`${this.name} scratched its nose and left!`);
    this.cooldown += 1000;
  }

  targetPlayer(target) {
    
    this.attackTarget = target;
    this.attack();
    
  }

  attack() {
      console.log(`${this.name} attacked you back!`)
      this.attackTarget.applyDamage(10);
      this.cooldown +=10000;
  }

  die() {
    super.die();
    console.log(`${this.name} dropped all of his items.`);
  }





}


module.exports = {
  Enemy,
};
