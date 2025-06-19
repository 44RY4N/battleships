import { ship } from "./ship.js";
import { createBoard, createBoardComputer } from "./domBoard.js";

function initializeGame() {
  const ship1 = new ship(4, "s1",10);
  const ship2 = new ship(5, "s2",10);
  const ship3 = new ship(2, "s3",10);
  ship1.dom();
  ship2.dom();
  ship3.dom();

  const boardElement = document.querySelector("#board");
  const board = createBoard(10, boardElement);

  const boardElementComputer = document.querySelector("#boardComputer");
  const boardComputer = createBoardComputer(10, boardElementComputer);
}

export { initializeGame };
