import { ship, allShips } from "./ship.js";
import {  rotateShip, dragStart} from "./domShip.js"
import { createBoard, createBoardComputer, dropShip} from "./domBoard.js";

function initializeGame() {

const game = document.getElementById("game");
game.style.display = "block"      // changin displ -----<<<<<<<

  const ship1 = new ship(4, "s1",10);
  const ship2 = new ship(5, "s2",10);
  const ship3 = new ship(2, "s3",10);
  ship1.dom();
  ship2.dom();
  ship3.dom();

  const readyButton = document.querySelector("#ready");
  readyButton.addEventListener("click", handleReady);

  const boardElement = document.querySelector("#board");
  const board = createBoard(10, boardElement);

  const boardElementComputer = document.querySelector("#boardComputer");
  const boardComputer = createBoardComputer(10, boardElementComputer);
}

function handleReady(){
  if(allShips.list.length == 0){
    const board = document.querySelector("#board");
    for (let child of board.children){
      child.draggable = false;
      child.removeEventListener("click",rotateShip);
      child.removeEventListener("dragstart",dragStart);
      child.removeEventListener("dragover", (e) => {
        e.preventDefault();
      });
      child.removeEventListener("drop", dropShip);
    }
  }
}

export { initializeGame };
