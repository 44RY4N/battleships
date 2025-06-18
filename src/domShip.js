
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
  const target = e.target.closest(".ships"); // ensures you're always referencing the draggable container
  if (!target || !target.id) {
    console.warn("dragStart: invalid drag target", e.target);
    return;
  }
  e.dataTransfer.setData('text/plain', target.id);
}

export{domShip}
