function createBoard(size){
    const board = document.querySelector("#board");
    const fragment = document.createDocumentFragment();
    let cellSize = 100 / size;
    board.style.gridTemplateColumns = `repeat(${size} , ${cellSize}%)`;

    for(let i = 0; i< size; i++){
        for(let j=0; j<size; j++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.width = `100%`;
            cell.style.height = `100%`;
            cell.style.border = "1px solid black";
            
            //event listners
            const ship = document.querySelector("#ship");

            ship.addEventListener("dragstart",dragStart)
            cell.addEventListener("dragover",(e)=>{
                e.preventDefault();
            })
            cell.addEventListener("drop",dropShip);


            fragment.appendChild(cell);
        }
    }
    board.appendChild(fragment);
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);

}

function dropShip(e){
  const shipId = e.dataTransfer.getData('text/plain');
  const ship = document.getElementById(shipId);
  const target = e.target;
const board = document.querySelector("#board");
  console.log(target)

  if (!target.classList.contains("ship")) {
    target.appendChild(ship);

    for (let child of board.children){
        child.classList.remove("ship")    
    }

    target.classList.add("ship");
}
}

export {createBoard};