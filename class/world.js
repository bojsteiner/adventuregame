const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');
const { Enemy } = require('./enemy');
const { DarkRoom } = require('./darkRoom');

class World {

  static rooms = {};
  static enemies = [];

  static setPlayer(player) {
    for (let i = 0 ; i < World.enemies.length ; i++) {
      if (World.enemies[i]) {
        World.enemies[i].setPlayer(player);
      }
    }
  }

  static startGame() {
    for (let i = 0 ; i < World.enemies.length ; i++) {
      if (World.enemies[i]) {
        World.enemies[i].rest();
      }
    }
  }

  static getEnemiesInRoom(room) {
    return World.enemies.filter(enemy => enemy.currentRoom === room);
  }

  static loadWorld(worldData) {

    const roomList = worldData.rooms;
    const darkRoomList = worldData.darkRooms;
    const itemList = worldData.items;
    const enemyList = worldData.enemies;

    // Instantiate new room objects
    // Get name, id and description from room data
    for (let i = 0 ; i < roomList.length ; i++) {

        let roomData = roomList[i];
        if(roomData.isDark) {
          let newRoom = new DarkRoom(roomData.name);
          World.rooms[roomData.id] = newRoom;
        } else {
          let newRoom = new Room(roomData.name, roomData.description);
          World.rooms[roomData.id] = newRoom;
        };

        
    }


    // Connect rooms by ID
    // Note that all rooms must be created before they can be connected
    for (let i = 0 ; i < roomList.length ; i++) {

      let roomID = roomList[i].id;
      let roomConnections = roomList[i].exits;

      for (const direction in roomConnections) {
        let connectedRoomID = roomConnections[direction];
        let roomToConnect = World.rooms[connectedRoomID];
        World.rooms[roomID].connectRooms(direction, roomToConnect);
      }

    }

    // Instantiate enemies
    for (let i = 0 ; i < enemyList.length ; i++) {

      let enemyData = enemyList[i];
      let enemyRoom = World.rooms[enemyData.room];
      let newEnemy = new Enemy(enemyData.name, enemyData.description, enemyRoom, enemyData.items);
      World.enemies.push(newEnemy);
    }

    // Instantiate items
    for (let i = 0 ; i < itemList.length ; i++) {

      let itemData = itemList[i];
      let newItem;

      if (itemData.isFood) {
        newItem = new Food(itemData.name, itemData.description);
      } else {
        newItem = new Item(itemData.name, itemData.description);
      }

      if(itemData.room) {
        let itemRoom = World.rooms[itemData.room];
        itemRoom.items.push(newItem);
      } else {
        let randomEnemy = Math.floor(World.enemies.length * Math.random())
        World.enemies[randomEnemy].items.push(newItem);
      }

      
   }

    
    

  }
}

module.exports = {
  World,
};
