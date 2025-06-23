import { ship, allShips } from "./ship.js";
import { rotateShip, dragStart } from "./domShip.js";
import { createBoard, createBoardComputer, dropShip } from "./domBoard.js";
import {beginGame} from "./beginGame.js";
import gsap from "gsap";

function initializeGame() {
  const game = document.getElementById("game");
  game.style.display = "grid"; // changin displ -----<<<<<<<

  const ship1 = new ship(4, "s1", 10);
  const ship2 = new ship(5, "s2", 10);
  const ship3 = new ship(2, "s3", 10);
  ship1.dom();
  ship2.dom();
  ship3.dom();

  const readyButton = document.querySelector("#ready");
  readyButton.addEventListener("click", handleReady);

  readyButton.addEventListener("mousedown",()=>{
    readyButton.style.backgroundColor = "rgba(189,0,255,0.7)";
  })

  readyButton.addEventListener("mouseup",()=>{
    readyButton.style.backgroundColor = "rgba(189,0,255,1)";
  })

  readyButton.addEventListener("mouseenter",()=>{
    readyButton.style.backgroundColor = "rgba(0,0,0,0.6)";
  })
  readyButton.addEventListener("mouseleave",()=>{
    readyButton.style.backgroundColor = "rgba(189,0,255,1)"
  })

  const boardElement = document.querySelector("#board");
  const board = createBoard(10, boardElement);

  const boardElementComputer = document.querySelector("#boardComputer");
  const boardComputer = createBoardComputer(10, boardElementComputer);
}

function handleReady() {
  if (allShips.list.length == 0) {
    const board = document.querySelector("#board");
    const button = document.querySelector("#ready");
    for (let child of board.children) {
      child.draggable = false;
      child.removeEventListener("click", rotateShip);
      child.removeEventListener("dragstart", dragStart);
      child.removeEventListener("dragover", (e) => {
        e.preventDefault();
      });
      child.removeEventListener("drop", dropShip);
    }
    setTimeout(()=>{
      handleBegin();
    },1000)
    gsap.to(button,{
      y:450,
      duration:0.8,
      ease:"power2.inOut",
    })
  }
  else{
    alert("Place all ships")
  }
}

function handleBegin(){
  const shell = document.querySelector(".shell");
      let b1 = document.querySelector(".boardContainer");
    let b2 = document.querySelector(".boardContainer2");
  gsap.to(shell.children,{
    scale:0,
    duration: 0.5,
    stagger:{
      from:"center",
      each:0.02
    },
    onComplete: () =>{
        gsap.to(b1,{
          x:200,
          duration:0.8
        })
        gsap.to(b2,{
          x:-200,
          duration:0.8,
          onComplete: ()=>{
            beginGame();
          }
        }
    )
      shell.style.backgroundColor = "transparent"
      setTimeout(()=>{
        shell.style.display = "none"
      },900)
    }
  })

}

export { initializeGame };
