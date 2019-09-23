var R = 1; //RADIUS OF PLAYER TEST CIRCLE

var colortest = '#FF0000'
var playerX = 915;
var playerY = 300;
var playerXorigin = 915;
var playerYorigin = 445;
var directionRight;
var directionLeft;
var directionUp;
var directionDown;
var directionUpLeft;
var directionUpRight;
var directionDownLeft;
var directionDownRight;
var playerCollisions = true;



var codeKeyUp = 87;
var codeKeyDown = 83;
var codeKeyLeft = 65;
var codeKeyRight = 68;

var codeKeyUpA = 38;
var codeKeyDownA = 40;
var codeKeyLeftA = 37;
var codeKeyRightA = 39;
var movementSpeed = 5;

var c;
var ctx;
var CanHeight;
var CanWidth;
var mapOpacity = 1;

var cTwo;
var ctxTwo;
var CanHeightTwo;
var CanWidthTwo;

var PicList = new Array("mapImage", "collision_map_OneImage","Area-OneandOne-storeImage","Area-Two_collisionImage","Area-TwoImage","Area-OneandOne-store_collisionImage"); // A "list" of JPG images to load

var PicListPng = new Array("spriteEnemyOneImage", "spriteLImage","spriteRImage","spriteSImage"); // A "list" of PNG images to load

var image;
var ImagesLoaded = 0;




///THIS WILL CHANGE(DONT FORGET)
var currentZone = 1;



function initCanvas() {

    c = document.getElementById("myCanvas");
    CanHeight = c.height;
    CanWidth = c.width;

    cTwo = document.getElementById("myCanvasTwo");
    CanHeightTwo = cTwo.height;
    CanWidthTwo = cTwo.width;


}


PreGame(); // NOTE: PreGame() is called AS THE PAGE LOADS



function PreGame() // Do Pre_Game stuff, like preload the images needed              
{
    var Next = 0;

    while (Next <= (PicList.length - 1)) {
        window[PicList[Next] + 'Image'] = preLoadImage('img/' + PicList[Next] + '.jpg');
        Next++;
    }
    
    var NextTwo = 0;

    while (NextTwo <= (PicListPng.length - 1)) {
        window[PicListPng[NextTwo] + 'Image'] = preLoadImage('img/' + PicListPng[NextTwo] + '.png');
        NextTwo++;
    }
};

function preLoadImage(url) // Load the image
{
    image = new Image();
    image.addEventListener("load", ImageLoaded, false); // "Listen" for the image to be finished loading
    image.src = url;
    console.log(image);
    return image;
}


function ImageLoaded() // Test to see if all images are loaded. (You might put a progress meter in here)
{
    ImagesLoaded++;
    if (ImagesLoaded == PicList.length) {
        console.log("The images have been preloaded.");

    }
}

var mymapImage = mapImageImage;
var mycollisionmapImage = collision_map_OneImageImage;


function getPixel(url, x, y, colorv) {
    if (colorv == "red") {
        return ctxTwo.getImageData(x, y, 1, 1).data[0];
    } else if (colorv == "green") {
        return ctxTwo.getImageData(x, y, 1, 1).data[1];
    } else if (colorv == "blue") {
        return ctxTwo.getImageData(x, y, 1, 1).data[2];
    } else if (colorv == "trans") {
        return ctxTwo.getImageData(x, y, 1, 1).data[3];
    } else if (colorv == "all") {
        return ctxTwo.getImageData(x, y, 1, 1).data;
    }
}

function inRange(x, min, max) {
    return ((x - min) * (x - max) <= 0);
}

var xPos;
var yPos;

function checkBounds(direction) {

    if (direction == "up") {
        xPos = playerX;
        yPos = playerY;

        if (inRange(getPixel('./bg.png', xPos, yPos, "red"), 228, 238) &&
            inRange(getPixel('./bg.png', xPos, yPos, "green"), 0, 4) &&
            inRange(getPixel('./bg.png', xPos, yPos, "blue"), 249, 255) && playerCollisions == true) {
            playerY += movementSpeed;
        }
        if (inRange(getPixel('./bg.png', xPos, yPos, "red"), 228, 238) &&
            inRange(getPixel('./bg.png', xPos, yPos, "green"), 0, 4) &&
            inRange(getPixel('./bg.png', xPos, yPos, "blue"), 249, 255) && playerCollisions == true) {

        }
    }

    if (direction == "down") {
        xPos = playerX;
        yPos = playerY + 30;

        if (inRange(getPixel('./bg.png', xPos, yPos, "red"), 228, 238) &&
            inRange(getPixel('./bg.png', xPos, yPos, "green"), 0, 4) &&
            inRange(getPixel('./bg.png', xPos, yPos, "blue"), 249, 255) && playerCollisions == true) {
            playerY -= movementSpeed;
        }
    }

    if (direction == "left") {
        xPos = playerX;
        yPos = playerY;

        if (inRange(getPixel('./bg.png', xPos, yPos, "red"), 228, 238) || inRange(getPixel('./bg.png', xPos, yPos + 30, "red"), 228, 238) &&
            inRange(getPixel('./bg.png', xPos, yPos, "green"), 0, 4) || inRange(getPixel('./bg.png', xPos, yPos + 30, "green"), 0, 4) &&
            inRange(getPixel('./bg.png', xPos, yPos, "blue"), 249, 255) || inRange(getPixel('./bg.png', xPos, yPos + 30, "blue"), 249, 255) == true) {
            if (playerCollisions == true) {
                playerX += movementSpeed;
            }
        }


    }
    if (direction == "right") {
        xPos = playerX + 30;
        yPos = playerY;

        if (inRange(getPixel('./bg.png', xPos, yPos, "red"), 228, 238) || inRange(getPixel('./bg.png', xPos, yPos + 30, "red"), 228, 238) &&
            inRange(getPixel('./bg.png', xPos, yPos, "green"), 0, 4) || inRange(getPixel('./bg.png', xPos, yPos + 30, "green"), 0, 4) &&
            inRange(getPixel('./bg.png', xPos, yPos, "blue"), 249, 255) || inRange(getPixel('./bg.png', xPos, yPos + 30, "blue"), 249, 255) == true) {
            if (playerCollisions == true) {
                playerX -= movementSpeed;
            }
        }


    }


}

var bound = 0;

function loadArea(newArea) {
    if (newArea == 1) {
        mycollisionmapImage = collision_map_OneImageImage;
        mymapImage = mapImageImage;
        currentArea = 1;

    } else if (newArea == 1.1) {
        mycollisionmapImage = Area-OneandOne-store_collisionImageImage;
        //mycollisionmapImage = testCollisionImage;
        mymapImage = areaOneandOneImageImage;
        playerX = 905;
        playerY = 950;
        currentArea = 1.1;

    } else if (newArea == 2) {
        mycollisionmapImage = areaTwoCollisionImageImage;
        //mycollisionmapImage = testCollisionImage;
        mymapImage = areaTwoImageImage;
        currentArea = 2;
        playerX = 1795;
        playerY = 1015;

    }




}


//Area position Array
//This works by listing positions in
//front of an areas "doors"
//Each Position takes up two spaces in the area.


//1.1    1.2      1.3        1.4     1.5       1.6     1.7
//Store, Bank, Wilderness, House(1),House(2),House(3),House(4)
var area1Arr = [945, 445, 960, 680, 110, 100];


function warp(lastpositionarea) {
    if (currentZone == 1) {
        if (lastpositionarea == 1.1) {
            playerX = area1Arr[0];
            playerY = area1Arr[1];

        } else if (lastpositionarea == 1.2) {
            playerX = area1Arr[2];
            playerY = area1Arr[3];

        } else if (lastpositionarea == 1.3) {
            playerX = area1Arr[4];
            playerY = area1Arr[5];

        } else if (lastpositionarea == 1.4) {
            playerX = area1Arr[6];
            playerY = area1Arr[7];

        } else if (lastpositionarea == 1.5) {
            playerX = area1Arr[8];
            playerY = area1Arr[9];

        } else if (lastpositionarea == 1.6) {
            playerX = area1Arr[10];
            playerY = area1Arr[12];

        } else if (lastpositionarea == 1.7) {
            playerX = area1Arr[13];
            playerY = area1Arr[14];

        }

    }

    if (currentZone == 2) {
        if (lastpositionarea == 1) {
            console.log("Last area was area-1");
        }


    }
}

var currentArea = 1;

function checkMapColorValue() {
    ////////////////////////////////
    ///          AREA MAP        
    ///--------------------------
    ///Area-1: main area         
    ///Area-1.1: main area - store
    ///Area-2: main area 2

    if (currentArea == 1) {
        //Store Door
        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 250, 255) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 250, 255) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 0, 3) && playerCollisions == true) {

            console.log("Store-YELLOW------LOADING area 1.1------");

            currentArea = 1.1;
            loadArea(1.1);

        }

        //Tunnel to 2nd area
        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 0, 5) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 130, 141) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 110, 120) && playerCollisions == true) {

            console.log("------LOADING area 2------");

            currentArea = 2;
            loadArea(2);

        }
    }

    if (currentArea == 1.1) {

        //Store Exit
        //Blue

        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 0, 3) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 92, 103) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 250, 255) && playerCollisions == true) {

            currentArea = 1;
            loadArea(1);
            warp(1.1);

        }

        //Talk To Store Operator
        //Green
        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 250, 255) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 250, 255) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 0, 3) && playerCollisions == true) {

        }



    }

    if (currentArea == 2) {

        //Area 2 Tunnel to Area-1
        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 39, 46) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 91, 99) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 45, 54) && playerCollisions == true) {

            console.log("------LOADING area 1------");

            currentArea = 1;
            loadArea(1);
            warp(1.3);

        }




    }



}



function showColor() {
    document.getElementById('position').innerHTML = "RGBA values: { " + getPixel('./bg.png', playerX, playerY, "all") + " }";
}

function drawPlayer() {

    ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(mymapImage, 0, 0, c.width, c.height);
    ctx.globalAlpha = mapOpacity;


    ctxTwo = cTwo.getContext("2d");
    ctxTwo.clearRect(0, 0, cTwo.width, cTwo.height);
    ctxTwo.drawImage(mycollisionmapImage, 0, 0, cTwo.width, cTwo.height);


    ctx.beginPath();
    ctx.drawImage(spriteSImageImage, playerX, playerY);
    ctx.stroke();
    showColor();
    checkMapColorValue();
    //console.log(getPixel('./bg.png', playerX, playerY,"red")); // [255, 255, 255, 0];


}





//This array is indexed as follows:
//Type, X-value, Y-value
var enemyArray = [spriteEnemyOneImageImage, 50, 50, spriteEnemyOneImageImage, 100, 100, spriteEnemyOneImageImage, 200, 200, spriteEnemyOneImageImage, 400, 400, spriteEnemyOneImageImage, 800, 800, spriteEnemyOneImageImage, 1000, 1000];

var enemyCount = (enemyArray.length / 3);
console.log("Enemy Count: ", enemyCount);

//
//function createEnemy() {
//
//
//}

function drawEnemy() {
    //Array Index Values:
    var typeVal = 0;
    var Xval = 1;
    var Yval = 2;
    var i;
    for (i = 0; i < enemyCount; i++) {
        
        
        
        ctx = c.getContext("2d");
        ctx.beginPath();

        
        
        ctx.drawImage(enemyArray[typeVal], enemyArray[Xval], enemyArray[Yval]);
        ctx.stroke();
        typeVal += 3;
        Xval += 3;
        Yval += 3;
    }
    typeVal = 0;
    Xval = 1;
    Yval = 2;
}




function onkeydown(e) {
    //RIGHT ARROW
    if (e.keyCode == codeKeyRight) {
        directionRight = true;
    } else if (e.keyCode == codeKeyRightA) {
        directionRight = true;
    }


    //LEFT ARROW
    if (e.keyCode == codeKeyLeft) {
        directionLeft = true;
    } else if (e.keyCode == codeKeyLeftA) {
        directionLeft = true;
    }


    //UP ARROW
    if (e.keyCode == codeKeyUp) {
        directionUp = true;
    } else if (e.keyCode == codeKeyUpA) {
        directionUp = true;
    }


    //DOWN ARROW
    if (e.keyCode == codeKeyDown) {
        directionDown = true;
    } else if (e.keyCode == codeKeyDownA) {
        directionDown = true;
    }


}

function onkeyup(e) {
    //RIGHT ARROW
    if (e.keyCode == codeKeyRight) {
        directionRight = false;
        spriteSImageImage.src = "img/spriteRImage.png";
    } else if (e.keyCode == codeKeyRightA) {
        directionRight = false;
    }


    //LEFT ARROW
    if (e.keyCode == codeKeyLeft) {
        directionLeft = false;
    } else if (e.keyCode == codeKeyLeftA) {
        directionLeft = false;
    }


    //UP ARROW
    if (e.keyCode == codeKeyUp) {
        directionUp = false;
    } else if (e.keyCode == codeKeyUpA) {
        directionUp = false;
    }


    //DOWN ARROW
    if (e.keyCode == codeKeyDown) {
        directionDown = false;
    } else if (e.keyCode == codeKeyDownA) {
        directionDown = false;
    }

}

function playerMovement() {

    if (directionRight == true) {
        playerX += movementSpeed;
        spriteSImageImage.src = "img/spriteRImage.png";
        checkBounds("right");

    }

    if (directionLeft == true) {
        playerX -= movementSpeed;
        spriteSImageImage.src = "img/spriteLImage.png";
        checkBounds("left");
    }

    if (directionUp == true) {
        playerY -= movementSpeed;
        spriteSImageImage.src = "img/spriteUImage.png";
        checkBounds("up");
    }

    if (directionDown == true) {
        playerY += movementSpeed;
        spriteSImageImage.src = "img/spriteDImage.png";
        checkBounds("down");
    }

}



function debug() {
    //console.log("Player-X: ", playerX, "  ", "Player-Y: ", playerY);
    document.getElementById('positionXY').innerHTML = "POS: { " + "X: " + playerX + " Y: " + playerY + " }";
}





function update() {
    drawPlayer();
    playerMovement();
    debug();
    drawEnemy();
}


/////////////////////////////////////////////////////////////////
window.addEventListener("keydown", onkeydown);
window.addEventListener("keyup", onkeyup);
setInterval(update, 16.5); // 33 milliseconds = ~ 30 frames per sec
/////////////////////////////////////////////////////////////////
