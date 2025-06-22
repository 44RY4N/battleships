import {
  calculateDomLengthLand,
  removePreviousMarks,
  addNeighbours,
  removePreviousMarksPort,
  getCellByIndex,
  isValidDrop,
  checkNeighbours,
  getCellByIndexComp,
} from "./domBoard.js";

const container = document.querySelector("#shipContainer");
function domShip(obj, boardSize) {
  let ship = document.createElement("div");
  ship.addEventListener("dragstart", dragStart);
  ship.classList.add("ships");
  ship.id = obj.id;
  ship.dataset.length = obj.length;
  ship.dataset.or = obj.orientation;
  ship.style.width = "100%";
  ship.style.height = "100%";
  ship.draggable = true;

  ship.addEventListener("click", rotateShip);

  const shipCase = document.createElement("div");
  shipCase.id = "shipCase";
  shipCase.style.width = `${ship.dataset.length * 10 / 3}%`;
  shipCase.style.height = `${38}%`;
  shipCase.appendChild(ship);

  container.append(shipCase);
}
function dragStart(e) {
  const target = e.target.closest(".ships"); // ensures you're always referencing the draggable container
  if (!target || !target.id) {
    console.warn("dragStart: invalid drag target", e.target);
    return;
  }
  e.dataTransfer.setData("text/plain", target.id);
}

function rotateShip(e) {
  if (e.target.parentElement.id == "shipCase") return;

  const target = e.target.closest(".ships");
  let result = calculateDomLengthLand(target.dataset.length);

  //  console.log(`clickd rotate with dataset ${target.dataset.or}`)

  if (target.dataset.or === "land") {
    //  console.log("element found in landscape")
    if (!isValidDropPort(target, result)) {
      return alert("invalid drop");
    }
    if (!checkNeighboursPort(target, result)) {
      return alert("invalid neighbour");
    }

    target.dataset.or = "port";
    removePreviousMarks(target);
    handleRotationPort(target, result);
    //  console.log(target);
  } else if (target.dataset.or === "port") {
    if (!isValidDrop(target, result)) {
      return alert("invalid drop");
    }
    if (!checkNeighbours(target, result)) {
      return alert("invalid neighbour");
    }

    target.dataset.or = "land";
    removePreviousMarksPort(target);
    handleRotationLand(target, result);
  }
}

function handleRotationPort(target, result) {
  let i = target.dataset.I;
  let j = target.dataset.J;
  getCellByIndex(i, j).classList.add("ship");
  getCellByIndex(i, j).classList.add("hidden");

  result = calculateDomLengthLand(target.dataset.length);
  addNeighboursPort(target, result);

  result = calculateDomLengthLand(target.dataset.length);

  let newGrid = `${target.dataset.I - result[0] + 1} / ${target.dataset.I - result[1] + 2}`;
  //  console.log("newGridColumn", newGrid)  // newGrid = 2 / 7
  let newGridCol = target.dataset.J - -1;
  //  console.log("newGridRow", newGridCol)  // newGridRow = 3
  target.style.gridRow = newGrid;
  target.style.gridColumn = newGridCol;
}

function handleRotationLand(target, result) {
  let i = target.dataset.I;
  let j = target.dataset.J;
  getCellByIndex(i, j).classList.add("ship");
  getCellByIndex(i, j).classList.add("hidden");

  result = calculateDomLengthLand(target.dataset.length);
  addNeighbours(target, result);

  result = calculateDomLengthLand(target.dataset.length);

  let newGrid = `${target.dataset.J - result[0] + 1} / ${target.dataset.J - result[1] + 2}`;
  // console.log("newGridColumn", newGrid)  // newGrid = 2 / 7
  let newGridRow = target.dataset.I - -1;
  //  console.log("newGridRow", newGridRow)  // newGridRow = 3
  target.style.gridRow = newGridRow;
  target.style.gridColumn = newGrid;
}

function isValidDropPort(target, result) {
  let i = target.dataset.I;
  //  console.log("i in valid", i)
  //  console.log("result in valid", result)

  let calculatedI = i - result[0];
  let calculatedJ = i - result[1];

  //  console.log("calculatedI", calculatedI)
  //  console.log("caculatedJ", calculatedJ)

  if (calculatedI < 0) return false;
  if (calculatedJ > 9) return false;

  //  console.log("is valid")
  return true;
}

function checkNeighboursPort(target, result, flag = false) {
  let i = target.dataset.I;
  let j = target.dataset.J;

  while (result[0] > 0) {
    let newJ = i - result[0];

    if (flag) {
      if (!getCellByIndexComp(newJ, j)) {
        return false;
      }
      if (getCellByIndexComp(newJ, j).classList.contains("ship")) {
        //  console.log(`ship found at ${newJ}, ${j}`)
        return false;
      }
    } else {
      if (!getCellByIndex(newJ, j)) {
        return false;
      }
      if (getCellByIndex(newJ, j).classList.contains("ship")) {
        //  console.log(`ship found at ${newJ}, ${j}`)
        return false;
      }
    }
    // console.log(getCellByIndex(i,newJ))
    result[0]--;
  }

  //  console.log("result inside addNeighbours", result)

  while (result[1] < 0) {
    //  console.log(" checking Neighbours ")

    let newI = i - result[1];

    if (flag) {
      if (!getCellByIndexComp(newI, j)) {
        return false;
      }

      //   console.log("newI", newI)
      if (getCellByIndexComp(newI, j).classList.contains("ship")) {
        //  console.log(`ship found at ${newI}, ${j}`);
        return false;
      }
    } else {
      if (!getCellByIndex(newI, j)) {
        return false;
      }

      //   console.log("newI", newI)
      if (getCellByIndex(newI, j).classList.contains("ship")) {
        //  console.log(`ship found at ${newI}, ${j}`);
        return false;
      }
    }
    //    console.log(getCellByIndex(i,newI))
    result[1]++;
  }

  return true;
}

function addNeighboursPort(target, result, flag = false) {
  let i = target.dataset.I;
  let j = target.dataset.J;

  // console.log("inside add neighbours port result = ",result)
  // console.log("target =", target)
  //console.log("flag =", flag)
  //  console.log(`Added classes in port to neighbours of ${i} ${j}`);

  while (result[0] > 0) {
    let newJ = i - result[0];
    if (flag) {
      getCellByIndexComp(newJ, j).classList.add("ship");
    } else {
      getCellByIndex(newJ, j).classList.add("hidden");
      getCellByIndex(newJ, j).classList.add("ship");
    }
    // console.log("adding ship and hidden to",(newJ))
    result[0]--;
  }

  //  console.log("result inside addNeighbours", result)

  while (result[1] < 0) {
    //    console.log("insiede 2nd whle")

    let newI = i - result[1];

    //   console.log("newI", newI)
    if (flag) {
      getCellByIndexComp(newI, j).classList.add("ship");
    } else {
      getCellByIndex(newI, j).classList.add("hidden");
      getCellByIndex(newI, j).classList.add("ship");
    }
    //  console.log("adding ship and hidden to",(newI))
    result[1]++;
  }
}

export {
  dragStart,
  rotateShip,
  domShip,
  checkNeighboursPort,
  isValidDropPort,
  handleRotationPort,
  addNeighboursPort,
};
