
const container = document.querySelector("#shipContainer")
function domShip(obj){
    let ship = document.createElement("div");
    ship.addEventListener("dragstart",dragStart);
    ship.classList.add("ships")
    ship.id = obj.id;
    ship.dataset.length = obj.length;
    ship.dataset.or = obj.orientation;
    ship.draggable = true;
    container.append(ship);
}
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}
export{domShip}
