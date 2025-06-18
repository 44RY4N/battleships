
import {domShip} from './domShip.js';

class ship{
    constructor(length, id){
        this.length = length;
        this.hit = 0;
        this.orientation = "land";
        this.id = id;
    }
    hitShip(){
        this.hit++;
    }
    isSunk(){
       return (this.hit == this.length);
    }
    rotate(){
        if(this.orientation == "land"){
            this.orientation = "port";
        }
        else if (this.orientation == "port"){
            this.orientation = "land";
        }
    }
    dom(){
        domShip(this);
    }
}

export {ship};