import {
  checkNeighboursPort,
  isValidDropPort,
  handleRotationPort,
  addNeighboursPort,
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
      cell.style.border = "1px solid white";
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

  const shellFragment = document.createDocumentFragment();
  const shell = document.createElement("div");
  shell.classList.add("shell");
  shell.style.position = "fixed";
  shell.style.top = "0";
  shell.style.left = "0";
  shell.style.width = "100%";
  shell.style.height = "100%";
  shell.style.background = "rgba(0,0,0,0.6)";
  shell.style.zIndex = "1";
  shell.style.display = "grid";
  shell.style.gridTemplateColumns = `repeat(${size} , ${cellSize}%)`;
  shell.style.gridTemplateRows = `repeat(${size} , ${cellSize}%)`;
  board.appendChild(shell)

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.width = `100%`;
      cell.style.height = `100%`;
      cell.style.border = "1px solid white";
      cell.dataset.index = i;
      cell.dataset.indexComp = i;
      cell.dataset.jndex = j;
      cell.dataset.jndexComp = j;

      cell.style.position = "";
      cell.style.zIndex = "0";

      //event listners
      fragment.appendChild(cell);

      const dropcell = document.createElement("div");
      dropcell.classList.add("dropcell");
      shellFragment.appendChild(dropcell)
    }
  }
  board.appendChild(fragment);
  shell.appendChild(shellFragment);

  populateComputerBoard(board, size);
}

function populateComputerBoard(board, size) {
  const copy = allShips.list.slice();
  const maxAttempts = 100;

  function checkShipSpan(target, tempShip, result, orientation, length) {
    let i = parseInt(target.dataset.indexComp);
    let j = parseInt(target.dataset.jndexComp);
    if (orientation === "land") {
      for (let offset = 0; offset < length; offset++) {
        let newJ = j + offset;
        const cell = getCellByIndexComp(i, newJ);
        if (!cell || cell.classList.contains("ship")) return false;
      }
    } else {
      for (let offset = 0; offset < length; offset++) {
        let newI = i + offset;
        const cell = getCellByIndexComp(newI, j);
        if (!cell || cell.classList.contains("ship")) return false;
      }
    }
    return true;
  }

  for (let ship of copy) {
    let attempts = 0;
    let placed = false;

    while (!placed && attempts < maxAttempts) {
      const randI = Math.floor(Math.random() * size);
      const randJ = Math.floor(Math.random() * size);
      const orientation = Math.random() < 0.5 ? "land" : "port";
      const target = getCellByIndexComp(randI, randJ);

      if (!target) {
        attempts++;
        continue;
      }

      const tempShip = {
        dataset: {
          length: ship.length,
          or: orientation,
          I: randI.toString(),
          J: randJ.toString(),
        },
      };

      const result = calculateDomLengthLand(ship.length);

      // Validate placement
      let isValid = false;
      if (orientation === "land") {
        isValid =
          isValidDrop(target, result, true) &&
          checkNeighbours(target, result, true);
      } else {
        isValid =
          isValidDropPort(tempShip, result, true) &&
          checkNeighboursPort(tempShip, result, true);
      }

      // Additional span check
      if (
        isValid &&
        checkShipSpan(target, tempShip, result, orientation, ship.length)
      ) {
        // Mark all cells together
        //  console.log(`Placed ship (length=${ship.length}, or=${orientation}) at [${randI}, ${randJ}]`);
        if (orientation === "land") {
          target.classList.add("ship");
          addNeighbours(target, calculateDomLengthLand(ship.length), true);
        } else {
          target.classList.add("ship");
          addNeighboursPort(
            tempShip,
            calculateDomLengthLand(ship.length),
            true,
          );
        }
        placed = true;
      }

      attempts++;
    }

    if (!placed) {
      console.warn(
        `Could not place ship of length ${ship.length} after ${maxAttempts} attempts`,
      );
    }
  }
}

function dropShip(e) {
  // console.log("All Ships: ", allShips.list)

  const shipId = e.dataTransfer.getData("text/plain");
  const ship = document.getElementById(shipId);

  const target = e.target;
  ship.dataset.I = target.dataset.index;
  ship.dataset.J = target.dataset.jndex;
  ship.dataset.index = target.dataset.index;
  ship.dataset.jndex = target.dataset.jndex;
  const board = target.parentElement;
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

    allShips.list = allShips.list.filter((s) => s.id !== shipId);
    console.log(
      "Ship removed from list:",
      shipId,
      "Remaining ships:",
      allShips.list,
    );
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

function addNeighbours(target, result, flag = false) {
  result[0];
  let i = target.dataset.index;
  let j = target.dataset.jndex;

  //  console.log(`Added classes in land to neighbours of ${i} ${j}`);

  while (result[0] > 0) {
    let newJ = j - result[0];
    if (flag) {
      getCellByIndexComp(i, newJ).classList.add("ship");
    } else {
      getCellByIndex(i, newJ).classList.add("ship");
      getCellByIndex(i, newJ).classList.add("hidden");
    }
    // console.log(getCellByIndex(i,newJ))
    result[0]--;
  }

  //  console.log("result inside addNeighbours", result)

  while (result[1] < 0) {
    //   console.log("insiede 2nd whle");

    let newI = j - result[1];

    //   console.log("newI", newI)
    if (flag) {
      getCellByIndexComp(i, newI).classList.add("ship");
    } else {
      getCellByIndex(i, newI).classList.add("ship");
      getCellByIndex(i, newI).classList.add("hidden");
    }
    //    console.log(getCellByIndex(i,newI))
    result[1]++;
  }
}

function getCellByIndex(i, j) {
  return document.querySelector(`.cell[data-index="${i}"][data-jndex="${j}"]`);
}

function getCellByIndexComp(i, j) {
  return document.querySelector(
    `.cell[data-index-comp="${i}"][data-jndex-comp="${j}"]`,
  );
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

function checkNeighbours(target, result, flag = false) {
  let i = target.dataset.index;
  let j = target.dataset.jndex;

  while (result[0] > 0) {
    let newJ = j - result[0];
    if (flag) {
      if (!getCellByIndexComp(i, newJ)) {
        return false;
      }

      if (getCellByIndexComp(i, newJ).classList.contains("ship")) return false;
    } else {
      if (!getCellByIndex(i, newJ)) {
        return false;
      }

      if (getCellByIndex(i, newJ).classList.contains("ship")) return false;
      // console.log(getCellByIndex(i,newJ))
    }
    result[0]--;
  }

  //  console.log("result inside addNeighbours", result)

  while (result[1] < 0) {
    // console.log(" checking Neighbours ");

    let newI = j - result[1];
    if (flag) {
      if (!getCellByIndexComp(i, newI)) {
        return false;
      }

      //   console.log("newI", newI)
      if (getCellByIndexComp(i, newI).classList.contains("ship")) return false;
    } else {
      if (!getCellByIndex(i, newI)) {
        return false;
      }

      //   console.log("newI", newI)
      if (getCellByIndex(i, newI).classList.contains("ship")) return false;
    }
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
  getCellByIndexComp,
  dropShip,
};
