function createBoard(size){
    const board = document.querySelector("#board");
    const fragment = document.createDocumentFragment();
    let cellSize = 100 / size;
    board.style.gridTemplateColumns = `repeat(${size} , ${cellSize}%)`;
    board.style.gridTemplateRows = `repeat(${size} , ${cellSize}%)`;
    board.style.position  = "absolute";

    for(let i = 0; i< size; i++){
        for(let j=0; j<size; j++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.width = `100%`;
            cell.style.height = `100%`;
            cell.style.border = "1px solid black";
            cell.dataset.index = i;
            cell.dataset.jndex = j;

            cell.style.position = "";
            cell.style.zIndex = "0"
            
            //event listners    
            cell.addEventListener("dragover",(e)=>{
                e.preventDefault();
            })
            cell.addEventListener("drop",dropShip);


            fragment.appendChild(cell);
        }
    }
    board.appendChild(fragment);
}


function dropShip(e){
  const shipId = e.dataTransfer.getData('text/plain');
  const ship = document.getElementById(shipId);
  const target = e.target;
  const board = document.querySelector("#board");
  console.log(target)

  if (!target.classList.contains("ship")) {


    console.log(ship.dataset.length)
   let result = calculateDomLengthLand(ship.dataset.length);



    //validity

       if(!isValidDrop(target,result)) {
        return alert("cant proceed")
       };

    if(ship.dataset.or == "land"){
      console.log("ship in landscape")
      let newGrid = `${target.dataset.jndex - result[0] + 1 } / ${target.dataset.jndex - result[1] + 2}`
      console.log("newGridColumn", newGrid)  // newGrid = 2 / 7
      let newGridRow = target.dataset.index - (-1);
      console.log("newGridRow", newGridRow)  // newGridRow = 3
      ship.style.gridColumn = newGrid ;
      ship.style.gridRow = newGridRow
    }
    
    ship.style.zIndex = "10";

    board.appendChild(ship);
    for (let child of board.children){
        child.classList.remove("ship") 
        child.classList.remove("hidden");   
    }

    target.classList.add("ship");
    target.classList.add("hidden");
    addNeighbours(target,result);
}
}

function calculateDomLengthLand(length){
  let right = 0;
  let left = 0;

 for (let i = 1; i<length;i++){
  if (i%2 == 1){
    right--;
 }
 else{
  left++;
 }
}
let result = [left,right];
return result;
}

function addNeighbours(target, result){
  result[0];
  let i = target.dataset.index;
  let j = target.dataset.jndex;


   while (result[0] > 0){
    let newJ = j - result[0]
    getCellByIndex(i, newJ).classList.add("hidden")
    getCellByIndex(i, newJ).classList.add("ship")
   // console.log(getCellByIndex(i,newJ))
    result[0]--;
    }

  //  console.log("result inside addNeighbours", result)

    while (result[1] < 0){

      console.log("insiede 2nd whle")

      let newI = j - result[1];

   //   console.log("newI", newI)
      getCellByIndex(i, newI).classList.add("hidden");
      getCellByIndex(i, newI).classList.add("ship")
  //    console.log(getCellByIndex(i,newI))
      result[1]++;
    }
}

function getCellByIndex(i, j) {
  return document.querySelector(`.cell[data-index="${i}"][data-jndex="${j}"]`);
}

function isValidDrop(target,result){
     console.log("index",target.dataset.index);
   console.log("jndex",target.dataset.jndex);

  let j = target.dataset.jndex;

  console.log("result in valid", result)

  let calculatedI = j - result[0] ;
  let calculatedJ = j - result[1] ;

  console.log("calculatedI", calculatedI)
  console.log("caculatedJ", calculatedJ)

  if (calculatedI < 0) return false;
  if (calculatedJ > 9) return false;

  console.log("is valid")
  return true;

}

export {createBoard};