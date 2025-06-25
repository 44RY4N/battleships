import { domShip } from "./domShip.js";

const allShips = {
  list: [],
  shipHitCount: 11,
  shipHitCountFriend: 11,
  shipHitCountComp: 11
};

class ship {
  constructor(length, id, boardSize,flag) {
    this.length = length;
    this.hit = 0;
    this.orientation = "land";
    this.id = id;
    this.boardSize = boardSize;
    this.flag = flag;
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
//console.log("in dom:: flag and ship:",this.id,this.flag)
    allShips.list.push(this);
    domShip(this, this.boardSize,this.flag);
  }
}

export { ship, allShips };
