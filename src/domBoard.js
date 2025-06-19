import {
  checkNeighboursPort,
  isValidDropPort,
  handleRotationPort,
} from "./domShip.js";
import { allShips } from "./ship.js";

function createBoard(size, board) {
  const fragment = document.createDocumentFragment();
  let cellSize = 100 / size;
  board.style.gridTemplateColumns = `repeat(${size} , ${cellSize}%)`;
  board.style.gridTemplateRows = `repeat(${size} , ${cellSize}%)`;
  board.style.position = "";

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.width = `100%`;
      cell.style.height = `100%`;
      cell.style.border = "1px solid black";
      cell.dataset.index = i;
      cell.dataset.jndex = j;

      cell.style.position = "";
      cell.style.zIndex = "0";

      //event listners
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      cell.addEventListener("drop", dropShip);

      fragment.appendChild(cell);
    }
  }
  board.appendChild(fragment);
}

// create board end

// create board computer

function createBoardComputer(size, board) {
  const fragment = document.createDocumentFragment();
  let cellSize = 100 / size;
  board.style.gridTemplateColumns = `repeat(${size} , ${cellSize}%)`;
  board.style.gridTemplateRows = `repeat(${size} , ${cellSize}%)`;
  board.style.position = "";

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.width = `100%`;
      cell.style.height = `100%`;
      cell.style.border = "1px solid black";
      cell.dataset.index = i;
      cell.dataset.jndex = j;

      cell.style.position = "";
      cell.style.zIndex = "0";

      //event listners
      fragment.appendChild(cell);
    }
  }
  board.appendChild(fragment);

  populateComputerBoard(board);
}

function populateComputerBoard(board) {
  const copy = allShips.list.slice();
  console.log(copy);
}

function dropShip(e) {
  const shipId = e.dataTransfer.getData("text/plain");
  const ship = document.getElementById(shipId);
  const target = e.target;
  ship.dataset.I = target.dataset.index;
  ship.dataset.J = target.dataset.jndex;
  ship.dataset.index = target.dataset.index;
  ship.dataset.jndex = target.dataset.jndex;
  const board = document.querySelector("#board");
//  console.log(target);

  if (!target.classList.contains("ship")) {
    if (!ship) {
      console.warn("Could not find dragged ship with ID:", shipId);
      return; // stop further execution
    }

  //  console.log("ship dataset", ship.dataset);

    let result = calculateDomLengthLand(ship.dataset.length);

    if (ship.dataset.or == "land") {
      if (!checkNeighbours(target, result)) return alert("ship colliding");
      if (!isValidDrop(target, result)) return alert("cant proceed");
      removePreviousMarks(ship);
    } else if (ship.dataset.or == "port") {
      if (!checkNeighboursPort(ship, result)) return alert("ship colliding");
      if (!isValidDropPort(ship, result)) return alert("cant proceed");
      removePreviousMarksPort(ship);
    }
  //  console.log("neighbourse checked");

    result = calculateDomLengthLand(ship.dataset.length);

  //  console.log(ship.dataset.length);

    ship.dataset.refi = target.dataset.jndex - result[0];
    ship.dataset.refj = target.dataset.jndex - result[1];
    ship.dataset.refI = target.dataset.index;

    ship.dataset.refJ = target.dataset.jndex;
    ship.dataset.refx = target.dataset.index - result[0];
    ship.dataset.refy = target.dataset.index - result[1];

 //   console.log("refi", ship.dataset.refi);
 //   console.log("refj", ship.dataset.refj);
 //   console.log("I", ship.dataset.I);

    //validity

    if (ship.dataset.or == "land") {
   //   console.log("ship in landscape");
      let newGrid = `${target.dataset.jndex - result[0] + 1} / ${target.dataset.jndex - result[1] + 2}`;
   //   console.log("newGridColumn", newGrid); // newGrid = 2 / 7
      let newGridRow = target.dataset.index - -1;
   //   console.log("newGridRow", newGridRow); // newGridRow = 3
      ship.style.gridColumn = newGrid;
      ship.style.gridRow = newGridRow;
    } else if (ship.dataset.or == "port") {
      handleRotationPort(ship, result);
    }

    ship.style.zIndex = "10";

    board.appendChild(ship);

    target.classList.add("ship");
    target.classList.add("hidden");
    if (ship.dataset.or == "land") {
      addNeighbours(target, result);
    }
  }
}

function calculateDomLengthLand(length) {
  let right = 0;
  let left = 0;

  for (let i = 1; i < length; i++) {
    if (i % 2 == 1) {
      right--;
    } else {
      left++;
    }
  }
  let result = [left, right];
  return result;
}

function addNeighbours(target, result) {
  result[0];
  let i = target.dataset.index;
  let j = target.dataset.jndex;

//  console.log(`Added classes in land to neighbours of ${i} ${j}`);

  while (result[0] > 0) {
    let newJ = j - result[0];
    getCellByIndex(i, newJ).classList.add("hidden");
    getCellByIndex(i, newJ).classList.add("ship");
    // console.log(getCellByIndex(i,newJ))
    result[0]--;
  }

  //  console.log("result inside addNeighbours", result)

  while (result[1] < 0) {
 //   console.log("insiede 2nd whle");

    let newI = j - result[1];

    //   console.log("newI", newI)
    getCellByIndex(i, newI).classList.add("hidden");
    getCellByIndex(i, newI).classList.add("ship");
    //    console.log(getCellByIndex(i,newI))
    result[1]++;
  }
}

function getCellByIndex(i, j) {
  return document.querySelector(`.cell[data-index="${i}"][data-jndex="${j}"]`);
}

function isValidDrop(target, result) {
//  console.log("index", target.dataset.index);
//  console.log("jndex", target.dataset.jndex);

  let j = target.dataset.jndex;

//  console.log("result in valid", result);

  let calculatedI = j - result[0];
  let calculatedJ = j - result[1];

//  console.log("calculatedI", calculatedI);
//  console.log("caculatedJ", calculatedJ);

  if (calculatedI < 0) return false;
  if (calculatedJ > 9) return false;

//  console.log("is valid");
  return true;
}
function removePreviousMarks(ship) {
  const i = ship.dataset.refI;
  const refStart = parseInt(ship.dataset.refi);
  const refEnd = parseInt(ship.dataset.refj);

  // Remove 'hidden' and 'ship' classes from the previously occupied cells
  for (let j = refStart; j <= refEnd; j++) {
    const cell = getCellByIndex(i, j);
    if (cell) {
    //  console.log("removing classes from cell", i, j);
      cell.classList.remove("ship", "hidden");
    }
  }
}

function removePreviousMarksPort(ship) {
  const j = ship.dataset.refJ;
  const refStart = parseInt(ship.dataset.refx);
  const refEnd = parseInt(ship.dataset.refy);

  // Remove 'hidden' and 'ship' classes from the previously occupied cells
  for (let i = refStart; i <= refEnd; i++) {
    const cell = getCellByIndex(i, j);
    if (cell) {
    //  console.log("removing classes from cell", i, j);
      cell.classList.remove("ship", "hidden");
    }
  }
}

function checkNeighbours(target, result) {
  let i = target.dataset.index;
  let j = target.dataset.jndex;

  while (result[0] > 0) {
    let newJ = j - result[0];

    if (!getCellByIndex(i, newJ)) {
      return false;
    }

    if (getCellByIndex(i, newJ).classList.contains("ship")) return false;
    // console.log(getCellByIndex(i,newJ))
    result[0]--;
  }

  //  console.log("result inside addNeighbours", result)

  while (result[1] < 0) {
   // console.log(" checking Neighbours ");

    let newI = j - result[1];

    if (!getCellByIndex(i, newI)) {
      return false;
    }

    //   console.log("newI", newI)
    if (getCellByIndex(i, newI).classList.contains("ship")) return false;
    //    console.log(getCellByIndex(i,newI))
    result[1]++;
  }

  return true;
}

export {
  addNeighbours,
  createBoard,
  createBoardComputer,
  calculateDomLengthLand,
  removePreviousMarks,
  getCellByIndex,
  removePreviousMarksPort,
  checkNeighbours,
  isValidDrop,
};
