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

    const ready = document.querySelector("#ready");
    ready.removeEventListener("click", handleReady);
    ready.removeEventListener("click",handleReadyFriend)
    
    const boardContainer = document.querySelector(".boardContainer");
    const boardContainer2 = document.querySelector(".boardContainer2");
    const buttonContainer = document.querySelector("#buttonContainer");

    gsap.to(boardContainer,{
        y:-600,
        duration: 1,
        ease: "power2.out"
    })
        gsap.to(boardContainer2,{
        y:-600,
        duration: 1,
        ease: "power2.out",
    })
    gsap.to(buttonContainer,{
        y: -600,
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