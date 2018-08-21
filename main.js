console.log(document)
const playingField = document.getElementById("playing-field");
console.log(playingField);
const down = document.getElementById("down");

const header = document.createElement("h1");
header.innerHTML = "The Best Game Ever!";
header.style.color = "#c0392b";
header.style.fontFamily = "Helvetica";
document.body.appendChild(header);

const subHeader = document.createElement("h2");
subHeader.innerHTML = "Game by: ~The Creator~";
subHeader.setAttribute("class", "heads");
document.body.appendChild(subHeader);

const block = document.getElementById("block");
const borderWalls = document.getElementById("playing-field").getBoundingClientRect();
const borderBlock = document.getElementById("block").getBoundingClientRect();

const createWalls = amount => {
    for(i=0; i <= amount; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "wall");
        document.getElementById("playing-field").appendChild(newDiv);
    }
}

createWalls(47);

const wallArr = document.getElementsByClassName("wall");

const limits = {
    left: 10,
    right: borderWalls.width - 25 - borderBlock.width,
    up: 10,
    down: borderWalls.height - 40 - borderBlock.height
}

const border = dir => {
    let compare;

    if (dir == "right" || dir == "left") {
        compare = parseInt(block.style.left);
    }
    
    if (dir == "up" || dir == "down") {
        compare = parseInt(block.style.top);
    }
    
    if(limits[dir] == compare) {
        return false;
    } 
    return true
}

const wallGenerator = () => {

}

const isPassable = () => {
    while(block.left < limits.right && block.top < limits.up) {
        let runner = true;

        
        if (border("right")){
            moveRight();
        }
        else if (border("down")){
            moveDown();
        }
        else if (border("left")){
            while(!border("down")) {
                for(i = 0; i < 6; i++) {moveLeft();}
                if(border("down")) {
                    moveDown();
                }
            }
        }
        else if(border("up")){
            while(runner){
                for(i = 0; i < 6; i++) {moveUp();}
                if(border("right")) {
                    moveRight();
                    runner = false;
                }
                else if(border("left")) {
                    moveLeft();
                    runner = false;
                }
            }
        }
        else {
            return false
        }
    }
    return true;
}

const moveUp = function() {
    if (!block.style.top) {block.style.top = "10px"}
    if (!border("up")) {return}
    let top = parseInt(block.style.top);
    top -= 15;
    block.style.top = top + "px";
}

const moveDown = function() {
    if (!block.style.top) {block.style.top = "10px"}
    if (!border("down")) {return}
    let top = parseInt(block.style.top);
    top += 15;
    block.style.top = top + "px";
}

const moveLeft = function() {
    if (!block.style.left) {block.style.left = "10px"}
    if (!border("left")) {return}
    let left= parseInt(block.style.left);
    left -= 15;
    block.style.left = left + "px";
}

const moveRight = function() {
    if (!block.style.left) {block.style.left = "10px"}
    if (!border("right")) {return}
    let left = parseInt(block.style.left);
    left += 15;
    block.style.left = left + "px";
}

const maxPerHeight = Math.floor((borderWalls.height - 40 - borderBlock.height) / borderBlock.height);
console.log(maxPerHeight);