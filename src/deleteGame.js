import gsap from "gsap";
import { allShips } from "./ship.js";
import { handleReady, handleReadyFriend} from "./game.js"
function deleteGame(){
    allShips.list = [];
    allShips.shipHitCount = 11;
    allShips.shipHitCountComp = 11;
    allShips.shipHitCountFriend = 11;
    const board = document.getElementById("board");
    const boardComp = document.getElementById("boardComputer")
    board.innerHTML = "";
    boardComp.innerHTML = "";
    board.classList.remove("hov");
    boardComp.classList.remove("hov");

    const p1tag = document.querySelector("#p1tag");
    const p2tag = document.querySelector("#p2tag");

    p1tag.classList.add("hiddenfade");
    p2tag.classList.add("hiddenfade");

    const textArea = document.querySelector("#textArea");
    textArea.classList.add("hiddenfade");

    const turnCounter = document.querySelector("#turnCounter");
    turnCounter.classList.add("hiddenfade");

    const turn = document.querySelector("#turn");
    turn.textContent = "";

    const backButton = document.querySelector("#backButton");
    backButton.style.display = "none";

    const ready = document.querySelector("#ready");
    ready.removeEventListener("click", handleReady);
    ready.removeEventListener("click",handleReadyFriend)
    
    const boardContainer = document.querySelector(".boardContainer");
    const boardContainer2 = document.querySelector(".boardContainer2");
    const buttonContainer = document.querySelector("#buttonContainer");

    gsap.to(boardContainer,{
        y:-800,
        duration: 1,
        ease: "power2.out"
    })
        gsap.to(boardContainer2,{
        y:-800,
        duration: 1,
        ease: "power2.out",
    })
    gsap.to(buttonContainer,{
        y: -800,
        duration: 1,
        ease: "power2.out"
    })
    const shipContainer = document.querySelector("#shipContainer");
    shipContainer.innerHTML = "";
    gsap.to(shipContainer,{
        y: 200,
        duration: 1,
        ease: "power2.out"
    })
    /*
    setTimeout(()=>{
         gsap.to(boardContainer,{
          x:-200,
          duration:0.8
        })
        gsap.to(boardContainer2,{
          x:200,
          duration:0.8,
        })
    },1200)*/

}
export {deleteGame}