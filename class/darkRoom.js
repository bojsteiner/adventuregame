const {Room} = require('./room');

class DarkRoom extends Room {
    constructor(name){
        super(name);
        this.description = "It's so dark in here, you can't see anything.";
        this.isDark = true;
    }

    printRoom() {
        if(this.isDark) {
            console.clear();
            console.log("");
            console.log(this.name);
            console.log("");
            console.log(this.description);
            console.log("");
            console.log(this.getExitsString());
            console.log("");
        } else {
            super.printRoom();
        }
        
      }

}

module.exports = {
    DarkRoom,
  };