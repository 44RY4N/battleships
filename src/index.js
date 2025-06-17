import {ship} from "./ship.js"
import { gameboard } from "./gameboard.js";
import "./styles.css"
import { createBoard } from "./domBoard.js";
const ship1 = new ship(4);
const ship2 = new ship(5);

const gameboard1 = new gameboard(10);
console.log(gameboard1);

const board = createBoard(10);
