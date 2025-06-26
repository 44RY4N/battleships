import { allShips } from "./ship.js";
import { getCellByIndex } from "./domBoard.js";

let size = 10;

function beginGame() {
  const cellSize = 100 / size;
  const board = document.querySelector("#board");
  const b2 = document.querySelector("#boardComputer");
  b2.classList.add("hov");

  // Create .pickshell
  const shellFragment = document.createDocumentFragment();
  const shell = document.createElement("div");
  shell.classList.add("pickshell");
  shell.style.position = "absolute"; // Changed to absolute for board alignment
  shell.style.top = "0";
  shell.style.left = "0";
  shell.style.width = "100%";
  shell.style.height = "100%";
  shell.style.background = "rgba(0,0,0,0)";
  shell.style.zIndex = "15"; // Matches domBoard.js z-index
  shell.style.display = "grid";
  shell.style.gridTemplateColumns = `repeat(${size}, ${cellSize}%)`;
  shell.style.gridTemplateRows = `repeat(${size}, ${cellSize}%)`;
  shell.style.pointerEvents = "none"; // Allow Three.js mousemove
  board.appendChild(shell);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const dropcell = document.createElement("div");
      dropcell.classList.add("pickcell");
      dropcell.dataset.index = i;
      dropcell.dataset.jndex = j;
      dropcell.style.pointerEvents = "auto"; // Enable clicks on pickcell
      shellFragment.appendChild(dropcell);
    }
  }
  shell.appendChild(shellFragment);

  // Click handlers for .dropcell on computer board
  for (let child of b2.querySelectorAll(".cell")) {
    child.addEventListener("click", () => {
      if (child.textContent !== "") return;
      if (child.classList.contains("ship")) {
        child.textContent = "X";
        child.style.display = "flex";
        child.style.justifyContent = "center";
        child.style.alignItems = "center";
        child.style.color = "red";
        child.style.backgroundColor = "black";
        shipHit();
      } else {
        child.style.backgroundColor = "rgba(0,255,255,0.6)";
        playCompTurn();
      }
    });
  }

  // Optional: Click handlers for .pickcell to test computer attacks
  const pickCells = document.querySelectorAll(".pickcell");
  pickCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.textContent !== "") return;
      const i = cell.dataset.index, j = cell.dataset.jndex;
      const boardCell = getCellByIndex(i, j);
      if (boardCell.classList.contains("ship")) {
        cell.textContent = "X";
        cell.style.display = "flex";
        cell.style.justifyContent = "center";
        cell.style.alignItems = "center";
        cell.style.color = "red";
        cell.style.backgroundColor = "black";
        allShips.shipHitCountComp--;
        if (allShips.shipHitCountComp === 0) setTimeout(() => alert("You Lost!"), 1000);
      } else {
        cell.style.backgroundColor = "rgba(0,255,0,0.6)";
      }
    });
  });
}

function shipHit() {
  allShips.shipHitCount--;
  console.log(allShips.shipHitCount);
  if (allShips.shipHitCount === 0) {
    setTimeout(() => alert("Player 1 Won!"), 1000);
  }
}

function shipHit2() {
  allShips.shipHitCountFriend--;
  console.log(allShips.shipHitCountFriend);
  if (allShips.shipHitCountFriend === 0) {
    setTimeout(() => alert("Player 2 Won!"), 1000);
  }
}

let anchor = null;
let moves = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) moves.push([i, j]);
}
let shuffledMoves = shuffleArray(moves);
let direction = 0;
let steps = 0;

function playCompTurn() {
  while (true) { // Iterative loop to avoid recursion
    let i, j;
    if (anchor !== null) {
      direction++;
      let validMove = false;
      if (direction === 1 && anchor[1] + 1 + steps< 10) {
        i = anchor[0]; j = anchor[1] + 1 + steps; // Right
        validMove = true;
        console.log("direction 1 ran");
      } else if (direction === 2 && anchor[1] - 1 - steps>= 0) {
        i = anchor[0]; j = anchor[1] - 1 - steps; // Left
        validMove = true;
        console.log("direction 2 ran");
      } else if (direction === 3 && anchor[0] - 1 - steps>= 0) {
        i = anchor[0] - 1 - steps; j = anchor[1]; // Up
        validMove = true;
        console.log("direction 3 ran");
      } else if (direction === 4 && anchor[0] + 1 + steps < 10) {
        i = anchor[0] + 1 + steps; j = anchor[1]; // Down
        validMove = true;
        console.log("direction 4 ran");
      }

      if ( direction > 4) {
        anchor = null; // Reset anchor
        direction = 0; // Reset direction
        steps = 0; // Reset steps
        console.log("reset anchor, switching to random mode");
        continue; // Switch to random mode
      }

      // Check if move is available
      let index = shuffledMoves.findIndex(([a, b]) => a === i && b === j);
      if (index === -1) {
        console.log("move already taken", i, j);
        continue; // Skip if already attacked
      }
      shuffledMoves.splice(index, 1);

      const currentPickCell = getPickCellByIndex(i, j);
      const currentCell = getCellByIndex(i, j);
      if (!currentPickCell || !currentCell) {
        console.warn("cell not found at index", i, j);
        continue; // Skip invalid cell
      }

      console.log("looking for cell", i, j);
      console.log("stats", { anchor, direction, currentPickCell });

      if (currentCell.classList.contains("ship")) {
        console.log("fetching cell");
        currentPickCell.style.display = "flex";
        currentPickCell.style.justifyContent = "center";
        currentPickCell.style.alignItems = "center";
        currentPickCell.style.color = "red";
        currentPickCell.textContent = "X";
        currentPickCell.style.backgroundColor = "black";
        allShips.shipHitCountComp--;
        if (allShips.shipHitCountComp === 0) {
          setTimeout(() => alert("You Lost!"), 1000);
          return;
        }
        steps++;
        direction--; // Retry same direction
       // anchor = [i, j]; // Update anchor to new hit
        continue;
      } else {
        steps = 0;
        currentPickCell.style.backgroundColor = "rgba(0,255,0,0.6)";
        if (direction === 4) {
          anchor = null; // All directions tried
          direction = 0;
          console.log("all directions tried, resetting anchor");
        }
      }
      return; // Exit after one move
    } else {
      if (shuffledMoves.length === 0) {
        console.warn("No more moves available!");
        return;
      }
      const currentMove = shuffledMoves.pop();
      i = currentMove[0]; j = currentMove[1];
      const currentCell = getCellByIndex(i, j);
      const currentPickCell = getPickCellByIndex(i, j);
      if (!currentPickCell || !currentCell) {
        console.warn("cell not found at index", i, j);
        return;
      }

      console.log("playing as comp");
     // console.log("current cell", currentCell);
     // console.log("current pick cell", currentPickCell);

      if (currentCell.classList.contains("ship")) {
        currentPickCell.style.display = "flex";
        currentPickCell.style.justifyContent = "center";
        currentPickCell.style.alignItems = "center";
        currentPickCell.style.color = "red";
        currentPickCell.textContent = "X";
        currentPickCell.style.backgroundColor = "black";
        allShips.shipHitCountComp--;
        anchor = currentMove;
        if (allShips.shipHitCountComp === 0) {
          setTimeout(() => alert("You Lost!"), 1000);
          return;
        }
        playCompTurn();
      } else {
        currentPickCell.style.backgroundColor = "rgba(0,255,0,0.6)";
      }
      return; // Exit after one move
    }
  }
}

function getPickCellByIndex(i, j) {
  return document.querySelector(`.pickcell[data-index="${i}"][data-jndex="${j}"]`);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function beginGameFriends(){
    const b1 = document.querySelector("#board");
  const b2 = document.querySelector("#boardComputer");
   let turn = "player1";

  const turn2 = document.querySelector("#turn");
  turn2.textContent = "Player 1";
   b2.classList.add("hov");
    for (let child of b2.querySelectorAll(".cell")) {
    child.addEventListener("click", () => {
      if (child.textContent !== "" || turn == "player2") return;
      if (child.classList.contains("ship")) {
        child.textContent = "X";
        child.style.display = "flex";
        child.style.justifyContent = "center";
        child.style.alignItems = "center";
        child.style.color = "red";
        child.style.backgroundColor = "black";
        shipHit();
      } else {
        child.style.backgroundColor = "rgba(0,255,255,0.6)";
        turn = changeTurn(turn);
      }
    });
  }

      for (let child of b1.querySelectorAll(".cell")) {
    child.addEventListener("click", () => {
      if (child.textContent !== "" || turn == "player1") return;
      if (child.classList.contains("ship")) {
        child.textContent = "X";
        child.style.display = "flex";
        child.style.justifyContent = "center";
        child.style.alignItems = "center";
        child.style.color = "red";
        child.style.backgroundColor = "black";
        shipHit2();
      } else {
        child.style.backgroundColor = "rgba(0,255,255,0.6)";
       turn = changeTurn(turn);
      }
    });
  }

}

function  changeTurn(turn){
  const b1 = document.querySelector("#board");
  const b2 = document.querySelector("#boardComputer");
  const turn2 = document.querySelector("#turn");
  if (turn == "player1") {
    turn2.textContent = "Player 2";
    b2.classList.remove("hov");
    b1.classList.add("hov");
  return "player2";
  }
  else if(turn == "player2"){
     turn2.textContent = "Player 1";
    b1.classList.remove("hov");
    b2.classList.add("hov");
    return "player1";
  }
  else console.warn("Error deciding turn", turn)
}

export { beginGame , beginGameFriends};