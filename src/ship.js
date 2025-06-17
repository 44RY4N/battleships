class ship{
    constructor(length){
        this.length = length;
        this.hit = 0;
        this.orientation = "land";
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
}

export {ship};