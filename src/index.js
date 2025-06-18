import {ship} from "./ship.js"

import "./styles.css"
import { createBoard } from "./domBoard.js";
const ship1 = new ship(4,"s1");
const ship2 = new ship(5,"s2");
const ship3 = new ship(2,"s3");

ship1.dom();
ship2.dom();
ship3.dom();



const board = createBoard(10);
