import { initializeGame, initializeGameFriend} from "./game.js";
import gsap from "gsap";
const game = document.querySelector("#game");

function beginPlay(){
    initializeGame();

   // console.log(window.innerWidth)
// filteration
const arr = Array.from(game.children); 
const filteredArr = arr.filter(child => child.id !== "shipContainer");
 
const shipContainer = document.querySelector("#shipContainer");

    gsap.to(filteredArr,{
        y:0,
        duration:4,
        ease:"elastic.out",
        stagger: 0.2
    })

    gsap.to(shipContainer,{
        y:40,
        duration:4,
        ease:"power1.inOut"
    })

}

function beginPlayFriend(){
    initializeGameFriend();

   // console.log(window.innerWidth)
// filteration
const arr = Array.from(game.children); 
const filteredArr = arr.filter(child => child.id !== "shipContainer");
 
const shipContainer = document.querySelector("#shipContainer");

    gsap.to(filteredArr,{
        y:0,
        duration:4,
        ease:"elastic.out",
        stagger: 0.2
    })

    gsap.to(shipContainer,{
        y:40,
        duration:4,
        ease:"power1.inOut"
    })

}
export {beginPlay, beginPlayFriend};