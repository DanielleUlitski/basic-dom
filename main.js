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

createWalls(29);

const wallArr = document.getElementsByClassName("wall");

const limits = {
    left: 10,
    right: borderWalls.width - 25 - borderBlock.width,
    up: 10,
    down: borderWalls.height - 40 - borderBlock.height
}

const isValidMove = dir => {
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

const randomNum = (min, max) => {
    return Math.floor(Math.random() * max + min);
}

const wallGenerator = () => {
    let wallBorders;
    for(i in wallArr) {
        wallBorders = wallArr[i].getBoundingClientRect();
        if (randomNum(0, 1)) {
            let j = randomNum(1, 4);
            if(j == 1) {
                limits["wall" + i] = wallBorders
            }
        }
    }
}

wallGenerator();
const isPassable = () => {
    let i=0;
    while(block.left < limits.right && block.top < limits.up && i < 400) {
        let runner = true;

        if(isValidMove("up") && !isValidMove("left") && !isValidMove("right")){
            moveUp();
        }
        else if (isValidMove("right")){
            moveDown();
        }
        else if (isValidMove("left") && !isValidMove("down")){
            moveLeft();
        }
        else if (isValidMove("down")){
            moveRight();
        }
        else {
            return false
        }
    i++;
    }
    return true;
}



const moveUp = function() {
    if (!block.style.top) {block.style.top = "10px"}
    if (!isValidMove("up")) {return}
    let top = parseInt(block.style.top);
    top -= 15;
    block.style.top = top + "px";
}

const moveDown = function() {
    if (!block.style.top) {block.style.top = "10px"}
    if (!isValidMove("down")) {return}
    let top = parseInt(block.style.top);
    top += 15;
    block.style.top = top + "px";
}

const moveLeft = function() {
    if (!block.style.left) {block.style.left = "10px"}
    if (!isValidMove("left")) {return}
    let left= parseInt(block.style.left);
    left -= 15;
    block.style.left = left + "px";
}

const moveRight = function() {
    if (!block.style.left) {block.style.left = "10px"}
    if (!isValidMove("right")) {return}
    let left = parseInt(block.style.left);
    left += 15;
    block.style.left = left + "px";
}

const maxPerHeight = Math.floor((borderWalls.height - 40 - borderBlock.height) / borderBlock.height);
console.log(maxPerHeight);

document.addEventListener("load", console.log(isPassable()));