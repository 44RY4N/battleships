import { ship, allShips } from "./ship.js";
import { rotateShip, dragStart } from "./domShip.js";
import { createBoard, createBoardComputer, dropShip,dropShipFriend, createBoard2} from "./domBoard.js";
import {beginGame,beginGameFriends} from "./beginGame.js";
import gsap from "gsap";
let played = false;
function initializeGame() {

  const turn = document.querySelector("#turn");
  const turnCounter = document.querySelector("#turnCounter");
  turn.textContent = "Human";

      let b1 = document.querySelector(".boardContainer");
    let b2 = document.querySelector(".boardContainer2");
  if(played){
    gsap.to(b1,{
          x:0,
          duration:0.8
        })
        gsap.to(b2,{
          x:0,
          duration:0.8,
        })
  }
  played = false;


  const game = document.getElementById("game");
  game.style.display = "grid"; // changin displ -----<<<<<<<

  const ship1 = new ship(4, "s1", 10,false);
  const ship2 = new ship(5, "s2", 10,false );
  const ship3 = new ship(2, "s3", 10,false);
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
  setTimeout(()=>{
    const backButton = document.querySelector("#backButton");
    backButton.style.display = "block";
  },4000)
  textArea.classList.remove("hiddenfade");
  turnCounter.classList.remove("hiddenfade")
  
}

function handleReady() {

  if (allShips.list.length == 0) {
      const readyButton = document.querySelector("#ready");
  readyButton.removeEventListener("click",handleReady)
    const board = document.querySelector("#board");
    const button = document.querySelector("#ready");
    const buttonContainer = document.querySelector("#buttonContainer");
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
    gsap.to(buttonContainer,{
      y:-600,
      duration:0.8,
      ease:"power1.inOut",
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
    played = true;
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


// Friend logic 

function initializeGameFriend() {
  
  const turn = document.querySelector("#turn");
  const turnCounter = document.querySelector("#turnCounter");
  turn.textContent = "Player 1";

    let b1 = document.querySelector(".boardContainer");
    let b2 = document.querySelector(".boardContainer2");
  if(played){
    gsap.to(b1,{
          x:0,
          duration:0.8
        })
        gsap.to(b2,{
          x:0,
          duration:0.8,
        })
  }
  played = false;



  const game = document.getElementById("game");
  game.style.display = "grid"; // changin displ -----<<<<<<<

  const ship1 = new ship(4, "s1", 10,false);
  const ship2 = new ship(5, "s2", 10,false);
  const ship3 = new ship(2, "s3", 10,false);
  ship1.dom();
  ship2.dom();
  ship3.dom();

  const readyButton = document.querySelector("#ready");
  readyButton.addEventListener("click", handleReadyFriend);

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
  const boardComputer = createBoard2(10, boardElementComputer);

  let bComp = document.querySelector("#boardComputer");
for(let child of bComp.children){
  child.removeEventListener("drop", dropShipFriend);
  child.removeEventListener("dragover",(e)=>{
    e.preventDefault();
  })
  child.draggable = false;
}

  setTimeout(()=>{
    const backButton = document.querySelector("#backButton");
    backButton.style.display = "block";
  },4000)
  textArea.classList.remove("hiddenfade");
  turnCounter.classList.remove("hiddenfade");

}
// initialize game friend 2 

function initializeGameFriend2() {

  const turn = document.querySelector("#turn");
  turn.textContent = "Player 2";

  const ship1 = new ship(4, "s4", 10,true);
  const ship2 = new ship(5, "s5", 10,true);
  const ship3 = new ship(2, "s6", 10,true);
  ship1.dom();
  ship2.dom();
  ship3.dom();

  const readyButton = document.querySelector("#ready");
  readyButton.addEventListener("click", handleReadyFriend2);

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
}


function handleReadyFriend() {

  if (allShips.list.length == 0) {
      const readyButton = document.querySelector("#ready");
  readyButton.removeEventListener("click", handleReadyFriend);
    const board = document.querySelector("#board");
    const button = document.querySelector("#ready");
    const buttonContainer = document.querySelector("#buttonContainer");

    const s1 = document.querySelector("#s1");
    const s2 = document.querySelector("#s2");
    const s3 = document.querySelector("#s3");


    for (let child of board.children) {
      child.draggable = false;
      child.classList.remove("hidden")
      child.removeEventListener("click", rotateShip);
      child.removeEventListener("dragstart", dragStart);
      child.removeEventListener("dragover", (e) => {
        e.preventDefault();
      });
      child.removeEventListener("drop", dropShip);
    }
    s1.classList.add("hidden");
    s2.classList.add("hidden");
    s3.classList.add("hidden");

let bComp = document.querySelector("#boardComputer");
for(let child of bComp.children){
  child.addEventListener("drop", dropShipFriend);
  child.addEventListener("dragover",(e)=>{
    e.preventDefault();
  })
  child.draggable = true;
}
    



    setTimeout(()=>{
      initializeGameFriend2();
    },1000)

      
  }
  else{
    alert("Place all ships")
  }
}

function handleReadyFriend2() {

  if (allShips.list.length == 0) {
      const readyButton = document.querySelector("#ready");
  readyButton.removeEventListener("click", handleReadyFriend2);
    const board = document.querySelector("#boardComputer");
    const button = document.querySelector("#ready");
    const buttonContainer = document.querySelector("#buttonContainer");

    const s1 = document.querySelector("#s4");
    const s2 = document.querySelector("#s5");
    const s3 = document.querySelector("#s6");


    for (let child of board.children) {
      child.draggable = false;
      child.classList.remove("hidden")
      child.removeEventListener("click", rotateShip);
      child.removeEventListener("dragstart", dragStart);
      child.removeEventListener("dragover", (e) => {
        e.preventDefault();
      });
      child.removeEventListener("drop", dropShip);
    }
    s1.classList.add("hidden");
    s2.classList.add("hidden");
    s3.classList.add("hidden");
    
    gsap.to(buttonContainer,{
      y:-600,
      duration:1,
      ease:"power2.inOut"
    })


    setTimeout(()=>{
      handleBeginFriends();
    },1000)

      
  }
  else{
    alert("Place all ships")
  }
}


function handleBeginFriends(){
  const shell = document.querySelector(".shell");
      let b1 = document.querySelector(".boardContainer");
    let b2 = document.querySelector(".boardContainer2");
    played = true;

        gsap.to(b1,{
          x:200,
          duration:0.8
        })
        gsap.to(b2,{
          x:-200,
          duration:0.8,
          onComplete: ()=>{
            beginGameFriends();
          }
        }
      )
    
}

export { initializeGame, initializeGameFriend, handleReady, handleReadyFriend};

/*
place ships
after placed, hide ship, remove hidden from cells 
keep ship on cell
show board
restock ships 
after placement do same and 
beginPLayFriend
*/
