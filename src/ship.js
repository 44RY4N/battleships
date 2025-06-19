import { domShip } from "./domShip.js";

const allShips = {
  list: [],
};

class ship {
  constructor(length, id, boardSize) {
    this.length = length;
    this.hit = 0;
    this.orientation = "land";
    this.id = id;
    this.boardSize = boardSize;
  }
  hitShip() {
    this.hit++;
  }
  isSunk() {
    return this.hit == this.length;
  }
  rotate() {
    if (this.orientation == "land") {
      this.orientation = "port";
    } else if (this.orientation == "port") {
      this.orientation = "land";
    }
  }
  dom() {
    allShips.list.push(this);
    domShip(this,this.boardSize);
  }
}

export { ship, allShips };
