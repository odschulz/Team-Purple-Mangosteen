﻿/* ----- BUTTONS ----- */

$("#StartButton").click(function () {
    $("#SplashScreen").hide();
    $("#levels").show();
});

$("#one").click(function () {
    showCanvas();
    $("#levels").hide();
    setLevel(1);
    gameLoop();
});

$("#two").click(function () {
    showCanvas()
    $("#levels").hide();
    setLevel(2);
    gameLoop();
});

$("#three").click(function () {
    setLevel(3);
    showCanvas();
    $("#levels").hide();
    gameLoop();
});

$("#creators").click(function () {
    $("#SplashScreen").hide();
    $("#credits").show();
});

$("#instructions").click(function () {
    $("#SplashScreen").hide();
    $("#info").show();
});

$(".button_back").click(function () {
    $("#levels").hide();
    $("#credits").hide();
    $("#info").hide();
    $("#playfield").hide();
    hideIngameControls();
    $("#SplashScreen").show();
});


/* -----GLOBAL VARIABLES----- */

var c = document.getElementById("playfield");
var ctx = c.getContext("2d");

var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 550;
var targetArray = [];
var innerWallArray = [];
var outerWallArray = [];
var boxArray = [];
var gameOver = false;
var LEVEL;
var BOX_SIZE;
var ROWS;
var COLUMNS;
var playerStartX;
var playerStartY;
var player;
var clearCoordinates = { x: 0, y: 0 };

var wallImage = new Image();
var boxImage = new Image();
var playerImage = new Image();
var targetImage = new Image();

boxImage.src = 'http://prikachi.com/images/292/7731292h.png';
playerImage.src = 'http://prikachi.com/images/293/7731293u.jpg';
targetImage.src = 'http://img2.wikia.nocookie.net/__cb20100923124601/headhuntersholosuite/images/9/90/Stargate_portal.gif';

var controls = document.getElementById('ingame-controls');

function hideIngameControls() {
    controls.setAttribute('style', 'visibility: hidden');
    document.getElementById('playfield').setAttribute('style', 'display: none');
}

function showCanvas() {
    document.getElementById('playfield').removeAttribute('style');
    document.getElementById('playfield').setAttribute('style', 'display: block');
}

hideIngameControls();

function resetLevel() {
    targetArray = [];
    innerWallArray = [];    
    boxArray = [];
    ctx.clearRect(BOX_SIZE, BOX_SIZE, CANVAS_WIDTH - 2 * BOX_SIZE, CANVAS_HEIGHT - 2 * BOX_SIZE);
    player = {
        x: playerStartX,
        y: playerStartY,
        draw: function () {
            ctx.drawImage(playerImage, 0, 0, 100, 100, this.x * BOX_SIZE + 1, this.y * BOX_SIZE + 1, BOX_SIZE - 2, BOX_SIZE - 2);
        }
    };
    gameLoop();
};



/* -----SET DIMENSIONS----- */

function setLevel(input) {
    LEVEL = input | LEVEL;

    switch (LEVEL) {
        case 1:
            BOX_SIZE = 75;
            ROWS = 8;
            COLUMNS = 8;
            playerStartX = 3;
            playerStartY = 5;
            wallImage.src = 'http://gamedesign.wdfiles.com/local--files/spriteart:sprite-art-101-brick-wall-i/brick_wall_tiled_perfect.png';
            break;
        case 2:
            BOX_SIZE = 75;
            ROWS = 7;
            COLUMNS = 7;
            playerStartX = 5;
            playerStartY = 3;
            wallImage.src = 'http://gamedesign.wdfiles.com/local--files/spriteart:sprite-art-101-brick-wall-i/brick_wall_tiled_perfect.png';
            break;
        case 3:
            BOX_SIZE = 80;
            ROWS = 8;
            COLUMNS = 9;
            playerStartX = 3;
            playerStartY = 2;
            wallImage.src = 'http://gamedesign.wdfiles.com/local--files/spriteart:sprite-art-101-brick-wall-i/beaten_brick_tiled.png';
            break;
        case 4:
        case 5:
        default:
            BOX_SIZE = 75;
            ROWS = 8;
            COLUMNS = 8;
            playerStartX = 3;
            playerStartY = 5;
            wallImage.src = 'http://gamedesign.wdfiles.com/local--files/spriteart:sprite-art-101-brick-wall-i/brick_wall_tiled_perfect.png';
            break;
    }

    var maxCellSize = Math.min(CANVAS_HEIGHT / ROWS, CANVAS_WIDTH / COLUMNS);
    if (BOX_SIZE > maxCellSize) {
        BOX_SIZE = maxCellSize;
    }

    CANVAS_HEIGHT = Math.min(CANVAS_HEIGHT, BOX_SIZE * ROWS);
    CANVAS_WIDTH = Math.min(CANVAS_WIDTH, BOX_SIZE * COLUMNS);
    var dimension = Math.min(CANVAS_HEIGHT, CANVAS_WIDTH);
    controls.setAttribute('style', dimension);

    document.getElementById("playfield").setAttribute("width", CANVAS_WIDTH);
    document.getElementById("playfield").setAttribute("height", CANVAS_HEIGHT);
    document.getElementById('ingame-controls').removeAttribute('style');

    wallImage.onload = drawOuterWall();

    boxImage.width = BOX_SIZE;

    player = {
        x: playerStartX,
        y: playerStartY,
        draw: function () {
            ctx.drawImage(playerImage, 0, 0, 100, 100, this.x * BOX_SIZE + 1, this.y * BOX_SIZE + 1, BOX_SIZE - 2, BOX_SIZE - 2);
        }
    };
}



/* -----PLAYER----- */

function gameLoop() {
    addObjects(LEVEL);
    drawInnerWall();
    drawTargets();
    drawBox();
    player.draw();
}



/* -----CREATE LEVELS----- */

// Depending on chosen level creates inner walls, boxes and targets in the corresponding arrays
function addObjects(LEVEL) {

    switch (LEVEL) {
        case 1:
            targetArray.push(CreateTarget(2, 1));
            targetArray.push(CreateTarget(4, 1));
            boxArray.push(CreateBox(2, 4));
            boxArray.push(CreateBox(4, 4));
            innerWallArray.push(CreateWall(2, 3));
            break;
        case 2:
            targetArray.push(CreateTarget(1, 5));
            targetArray.push(CreateTarget(4, 1));
            boxArray.push(CreateBox(3, 3));
            boxArray.push(CreateBox(4, 3));
            innerWallArray.push(CreateWall(2, 2));
            innerWallArray.push(CreateWall(3, 2));
            innerWallArray.push(CreateWall(2, 4));
            innerWallArray.push(CreateWall(5, 1));
            innerWallArray.push(CreateWall(5, 2));
            break;
        case 3:
            targetArray.push(CreateTarget(6, 2));
            targetArray.push(CreateTarget(7, 2));
            boxArray.push(CreateBox(4, 2));
            boxArray.push(CreateBox(5, 2));
            innerWallArray.push(CreateWall(6, 1));
            innerWallArray.push(CreateWall(7, 1));
            innerWallArray.push(CreateWall(1, 3));
            innerWallArray.push(CreateWall(2, 3));
            innerWallArray.push(CreateWall(3, 3));
            innerWallArray.push(CreateWall(5, 3));
            innerWallArray.push(CreateWall(6, 3));
            innerWallArray.push(CreateWall(2, 4));
            innerWallArray.push(CreateWall(2, 5));
            innerWallArray.push(CreateWall(2, 6));
            innerWallArray.push(CreateWall(6, 6));
            innerWallArray.push(CreateWall(6, 5));
            innerWallArray.push(CreateWall(7, 5));
            innerWallArray.push(CreateWall(1, 4));
            innerWallArray.push(CreateWall(1, 5));
            innerWallArray.push(CreateWall(1, 6));
            innerWallArray.push(CreateWall(7, 6));
            break;
        case 4:
        case 5:
        default:
            break;
    }
}



/* -----DRAW GRID LAYOUT----- */

function clearCanvas() {
    if (clearCoordinates.x > 0 && clearCoordinates.y > 0) {
        ctx.clearRect(clearCoordinates.x, clearCoordinates.y, BOX_SIZE, BOX_SIZE);
    }
}

function refreshScreen() {
    clearCanvas();
    drawTargets();
    drawBox();
    player.draw();

    if (gameWon()) {
        printVictoryMessage();
        gameOver = true;
    }
}



/* -----OUTER WALLS----- */

function createOuterWalls() {
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLUMNS; col++) {
            if (row == 0 ||
                col == 0 ||
                row == ROWS - 1 ||
                col == COLUMNS - 1) {
                outerWallArray.push(CreateWall(col, row));
            }
        }
    }
}

function drawOuterWall() {
    createOuterWalls();
    for (i = 0; i < outerWallArray.length; i++) {
        outerWallArray[i].draw();
    }
}



/* -----INNER WALLS----- */

function CreateWall(xCoord, yCoord) {
    return {
        x: xCoord,
        y: yCoord,
        draw: function () {
            var pat = ctx.createPattern(wallImage, "repeat");
            ctx.rect(this.x * BOX_SIZE, this.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
            ctx.fillStyle = pat;
            ctx.fill();
        }
    };
}

function drawInnerWall() {
    for (var i = 0; i < innerWallArray.length; i++) {
        innerWallArray[i].draw();
    }
}



/* -----BOXES----- */

function CreateBox(xCoord, yCoord) {
    return {
        x: xCoord,
        y: yCoord,
        draw: function () {
            ctx.drawImage(boxImage, 0, 0, 100, 100, this.x * BOX_SIZE + 1, this.y * BOX_SIZE + 1, BOX_SIZE - 2, BOX_SIZE - 2);
        }
    };
}

function drawBox() {
    for (var i = 0; i < boxArray.length; i++) {
        boxArray[i].draw();
    }
}



/* -----TARGETS----- */

function CreateTarget(xCoord, yCoord) {
    return {
        x: xCoord,
        y: yCoord,
        draw: function () {
            ctx.drawImage(targetImage, 0, 0, 200, 200, this.x * BOX_SIZE + 1, this.y * BOX_SIZE + 1, BOX_SIZE - 2, BOX_SIZE - 2);
        }
    };
}

function drawTargets() {
    for (var index in targetArray) {
        targetArray[index].draw();
    }
}



/* -----COLLISION CHECKS----- */

//this checks if an object overlaps with a WALL by comparing X,Y coordinates
function overlapsWall(objX, objY) {
    var isOverlapping = 0;
    //checks if object overlaps with inner walls coordinates
    for (var i = 0; i < innerWallArray.length; i++) {
        if (innerWallArray[i].x == objX && innerWallArray[i].y == objY) {
            isOverlapping++;
            break;
        }
    }
    //check if object overlaps with outer walls coordinates
    for (i = 0; i < outerWallArray.length; i++) {
        if (outerWallArray[i].x == objX && outerWallArray[i].y == objY) {
            isOverlapping++;
            break;
        }
    }
    return isOverlapping;
}

//this checks if an object overlaps with a BOX by comparing X,Y coordinates
function overlapsBox(objX, objY) {
    var isOverlapping = 0;
    for (var i = 0; i < boxArray.length; i++) {
        if (boxArray[i].x == objX && boxArray[i].y == objY) {
            boxIndex = i;
            isOverlapping++;
            break;
        }
    }
    return isOverlapping;
}

//this checks if an object overlaps with a BOX and Wall or another BOX next to it:
function overlapsTwoBoxes(objX, objY, directionX, directionY) {
    var isOverlapping = 0;
    //check if object overlaps with any of the box coordinates
    for (var i = 0; i < boxArray.length; i++) {
        if (boxArray[i].x == objX && boxArray[i].y == objY) {
            isOverlapping++;
        } else if (boxArray[i].x == directionX && boxArray[i].y == directionY) {
            isOverlapping++;
        }
    }
    //uses the overlapsWall() function to check if there is a wall next to the box
    if (overlapsWall(directionX, directionY)) {
        isOverlapping++;
    }
    if (isOverlapping < 2) {
        isOverlapping = 0;
    }
    return isOverlapping;
}



/* -----PLAYER MOVEMENT----- */

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(event) {
    var keyPressed = event.keyCode;
    if (!gameOver) {
        if (keyPressed == 37 && !overlapsWall(player.x - 1, player.y) && !overlapsTwoBoxes(player.x - 1, player.y, player.x - 2 * 1, player.y)) { // left       
            clearCoordinates.x = player.x * BOX_SIZE;
            clearCoordinates.y = player.y * BOX_SIZE;
            player.x -= 1;
            if (overlapsBox(player.x, player.y) && !overlapsWall(player.x - 1, player.y)) {
                boxArray[boxIndex].x -= 1;
                document.getElementById('slide').play();
            }
        } else if (keyPressed == 38 && !overlapsWall(player.x, player.y - 1) && !overlapsTwoBoxes(player.x, player.y - 1, player.x, player.y - 2 * 1)) { // up
            clearCoordinates.x = player.x * BOX_SIZE;
            clearCoordinates.y = player.y * BOX_SIZE;
            player.y -= 1;
            if (overlapsBox(player.x, player.y) && !overlapsWall(player.x, player.y - 1)) {
                boxArray[boxIndex].y -= 1;
                document.getElementById('slide').play();
            }
        } else if (keyPressed == 39 && !overlapsWall(player.x + 1, player.y) && !overlapsTwoBoxes(player.x + 1, player.y, player.x + 2 * 1, player.y)) { // right
            clearCoordinates.x = player.x * BOX_SIZE;
            clearCoordinates.y = player.y * BOX_SIZE;
            player.x += 1;
            if (overlapsBox(player.x, player.y) && !overlapsWall(player.x + 1, player.y)) {
                boxArray[boxIndex].x += 1;
                document.getElementById('slide').play();
            }
        } else if (keyPressed == 40 && !overlapsWall(player.x, player.y + 1) && !overlapsTwoBoxes(player.x, player.y + 1, player.x, player.y + 2 * 1)) { // down
            clearCoordinates.x = player.x * BOX_SIZE;
            clearCoordinates.y = player.y * BOX_SIZE;
            player.y += 1;
            if (overlapsBox(player.x, player.y) && !overlapsWall(player.x, player.y + 1)) {
                boxArray[boxIndex].y += 1;
                document.getElementById('slide').play();
            }
        }

        if (keyPressed == 37 || keyPressed == 38 || keyPressed == 39 || keyPressed == 40) {
            document.getElementById('footsteps').play();
        }
        refreshScreen();
    }

}



/* -----VICTORY CHECK----- */

function gameWon() {
    var totalBoxes = boxArray.length;

    var completed = 0;

    for (var i = 0; i < boxArray.length; i++) {
        for (var j = 0; j < targetArray.length; j++) {
            if (boxArray[i].x == targetArray[j].x && boxArray[i].y == targetArray[j].y) {
                completed += 1;
            }
        }
    }

    if (completed == totalBoxes) {
        window.location = 'victory.html';
    }
}
