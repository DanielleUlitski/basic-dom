const playingField = document.getElementById("playing-field");
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

const block = $("#block");
const borderWalls = playingField.getBoundingClientRect();
const borderBlock = document.getElementById("block").getBoundingClientRect();


const createWalls = amount => {
    for(i=0; i <= amount; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "wall");
        newDiv.setAttribute("id", i);
        newDiv.style.boxSizing = "border-box";
        playingField.appendChild(newDiv);
    }
    $("#0").append(block);
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
    if(!$("#block").parent()[0].style.borderTop && dir == "up") {
        if(parseInt(block.parent().attr("id")) > 4) {
            return true;
        }
    }
    if(!$("#block").parent()[0].style.borderLeft && dir == "left") {
        if (!parseInt(block.parent().attr("id")) % 5 == 0){
            return true;
        }
    }
    if (!(parseInt(block.parent().attr("id")) - 4) % 5 == 0) {
        if(!$("#block").parent().next()[0].style.borderLeft && dir == "right") {
            return true;
        }
    }
    if(parseInt(block.parent().attr("id")) < 25) {
        if(!$("#block").parent().next().next().next().next().next()[0].style.borderTop && dir == "down") {
            return true;
        }
    }
    return false;
}

const randomNum = (min, max) => {
    return Math.floor(Math.random() * max + min);
}

const wallGenerator = () => {
    for(i = 0; i < wallArr.length; i++) {
        let j = randomNum(1, 2);
        switch(j) {
            case(1):
            wallArr[i].style.borderTop = "1px solid black";
            break;
            case(2):
            wallArr[i].style.borderLeft = "1px solid black";
        }
    }
}

console.log(wallArr);

const pseudoMoveUp = function() {
    if(isValidMove("up")) {
        block.parent().prev().prev().prev().prev().prev().append(block);
    }
}

const pseudoMoveDown = function() {
    if(isValidMove("down")) {
        block.parent().next().next().next().next().next().append(block);
    }
}

const pseudoMoveLeft = function() {
    if(isValidMove("left")) {
        block.parent().prev().append(block);
    }
}

const pseudoMoveRight = function() {
    if (isValidMove("right")) {
        block.parent().next().append(block);
    }

}

const isPassable = () => {
    let i = 0;
    while (parseInt(block.parent().attr("id")) < 29 && i < 400) {
        if(isValidMove("right")) {
            pseudoMoveRight();
        }
        else if(isValidMove("down")) {
            pseudoMoveDown();
        }
        else if(isValidMove("left")) {
            let j = 0;
            while(isValidMove("left") && !isValidMove("down") && !isValidMove("up") && j < 6) {
                pseudoMoveLeft();
                j++
            }
            if(isValidMove("down")) {
                pseudoMoveDown();
            }
            else if(isValidMove("up")) {
                pseudoMoveUp();
            }
            if (j == 6) {
                $("#0").append(block);
                return false;
            }
        }
        else if(isValidMove("up")) {
            let j = 0;
            while(isValidMove("up") && !isValidMove("right") && !isValidMove("left") && j < 6) {
                pseudoMoveUp();
                j++;
            }
            if(isValidMove("right")) {
                pseudoMoveRight();
            }
            else if(isValidMove("left")) {
                pseudoMoveLeft();
            }
            if (j == 6) {
                $("#0").append(block);
                return false;
            }
        }
        i++;
    }
    if(i == 400) {
        $("#0").append(block);
        i = 0;
        while (parseInt(block.parent().attr("id")) < 29 && i < 400) {
            if(isValidMove("down")) {
                pseudoMoveDown();
            }
            else if(isValidMove("right")) {
                pseudoMoveRight();
            }
            else if(isValidMove("left")) {
                let j = 0;
                while(isValidMove("left") && !isValidMove("down") && !isValidMove("up") && j < 6) {
                    pseudoMoveLeft();
                    j++
                }
                if(isValidMove("down")) {
                    pseudoMoveDown();
                }
                else if(isValidMove("up")) {
                    pseudoMoveUp();
                }
                if (j == 6) {
                    $("#0").append(block);
                    return false;
                }
            }
            else if(isValidMove("up")) {
                let j = 0;
                while(isValidMove("up") && !isValidMove("right") && !isValidMove("left") && j < 6) {
                    pseudoMoveUp();
                    j++;
                }
                if(isValidMove("right")) {
                    pseudoMoveRight();
                }
                else if(isValidMove("left")) {
                    pseudoMoveLeft();
                }
                if (j == 6) {
                    $("#0").append(block);
                    return false;
                }
            }
            i++;
        }
        
        if (i==400){
            $("#0").append(block);
            return false;
        }
        $("#0").append(block);
        return true;
    }
    $("#0").append(block);
    return true;
}

console.log(isPassable());

const nullifyWalls = () => {
    for(i = 0; i < 30; i++) {
        $("#" + i).css("left", "");
        $("#" + i).css("top", "");
    }
}

const mazeConstruct = () => {
    wallGenerator();
    while (!isPassable()) {
        nullifyWalls()
        wallGenerator();
    }
}

const moveUp = function() {
    if(!block.css("top")) {block.css("top", "10px")}
    if(isValidMove("up")) {
        let up = parseInt(block.css("top"))
        up -= parseInt(block.parent().css("height"));
        block.css("top", up + "px");
        block.parent().prev().prev().prev().prev().prev().append(block);
    }
}

const moveDown = function() {
    if(!block.css("top")) {block.css("top", "10px")}
    if(isValidMove("down")) {
        let up = parseInt(block.css("top"));
        up += parseInt(block.parent().css("height"));
        block.css("top", up + "px")
        block.parent().next().next().next().next().next().append(block);
    }
    if (parseInt(block.parent().attr("id")) == 29) {
        $("#cong").css("display", "block");
    }
}

const moveLeft = function() {
    if (!block.css("left")) {block.css("left", "10px")}
    if(isValidMove("left")) {
        let left = parseInt(block.css("left"));
        left -= parseInt(block.parent().css("width"));
        block.css("left", left + "px");
        block.parent().prev().append(block);
    }
}

const moveRight = function() {
    if (!block.css("left")) {block.css("left" , "10px")}
    if (isValidMove("right")) {
        let left = parseInt(block.css("left"));
        left += parseInt(block.parent().css("width"));
        block.css("left", left + "px");
        block.parent().next().append(block);
    }
    if (parseInt(block.parent().attr("id")) == 29) {
        $("#cong").css("display", "block");
    }
}

document.addEventListener("load", mazeConstruct());