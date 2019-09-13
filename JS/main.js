var R = 1; //RADIUS OF PLAYER TEST CIRCLE

var colortest = '#FF0000'
var playerX = 915;
var playerY = 525;
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

var cTwo;
var ctxTwo;
var CanHeightTwo;
var CanWidthTwo;

var PicList = new Array("map"); // A "list" of PNG images to load

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
};

function preLoadImage(url) // Load the image
{
    image = new Image();
    image.addEventListener("load", ImageLoaded, false); // "Listen" for the image to be finished loading
    image.src = url;
    console.log(image);
    return image;
}

var mymapImage;
var mycollisionmapImage;

function ImageLoaded() // Test to see if all images are loaded. (You might put a progress meter in here)
{
    ImagesLoaded++;
    if (ImagesLoaded == PicList.length) {
        console.log("The images have been preloaded.");

        image = new Image();
        image.src = "img/map.jpg";
        mymapImage = image;

        testCollisionImage = new Image();
        testCollisionImage.src = "img/testCollisionMap.jpg";
        console.log(testCollisionImage);


        image2 = new Image();
        image2.src = "img/collision_map_1.jpg";
        mycollisionmapImage = image2;
        console.log(mycollisionmapImage);

        area1and1Image = new Image();
        area1and1Image.src = "img/Area-1.1-store.jpg";
        console.log(area1and1Image);

        area1and1CollisionImage = new Image();
        area1and1CollisionImage.src = "img/Area-1.1-store_collision.jpg";
        console.log(area1and1CollisionImage);

        //Left
        image3 = new Image();
        image3.src = "img/spriteL.png";
        myspriteLImage = image3;
        console.log(myspriteLImage);

        //Right
        image4 = new Image();
        image4.src = "img/spriteR.png";
        myspriteRImage = image4;
        console.log(myspriteRImage);

        //Stationary
        image5 = new Image();
        image5.src = "img/spriteS.png";
        myspriteSImage = image5;
        console.log(myspriteSImage);
    }
}



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
        mycollisionmapImage = image2;
        mymapImage = image;

    } else if (newArea == 1.1) {
        mycollisionmapImage = area1and1CollisionImage;
        //mycollisionmapImage = testCollisionImage;
        mymapImage = area1and1Image;
        playerX = 905;
        playerY = 950;

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
}

var currentArea = 1;

function checkMapColorValue() {
    ////////////////////////////////
    ///          AREA MAP        
    ///--------------------------
    ///Area-1: main area         
    ///Area-1.1: main area - store

    if (currentArea == 1) {
        //Store Door
        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 250, 255) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 250, 255) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 0, 3) && playerCollisions == true) {

            console.log("Store-YELLOW------LOADING area 1.1------");

            currentArea = 1.1;
            loadArea(1.1);

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



}



function showColor() {
    document.getElementById('position').innerHTML = "RGBA values: { " + getPixel('./bg.png', playerX, playerY, "all") + " }";
}

function drawPlayer() {



    ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(mymapImage, 0, 0, c.width, c.height);
    ctx.globalAlpha = 1;


    ctxTwo = cTwo.getContext("2d");
    ctxTwo.clearRect(0, 0, cTwo.width, cTwo.height);
    ctxTwo.drawImage(mycollisionmapImage, 0, 0, cTwo.width, cTwo.height);


    ctx.beginPath();
    ctx.drawImage(myspriteSImage, playerX, playerY);
    ctx.stroke();
    showColor();
    checkMapColorValue();
    //console.log(getPixel('./bg.png', playerX, playerY,"red")); // [255, 255, 255, 0];


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
        myspriteSImage.src = "img/spriteR.png";
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
        myspriteSImage.src = "img/spriteR.png";
        checkBounds("right");

    }

    if (directionLeft == true) {
        playerX -= movementSpeed;
        myspriteSImage.src = "img/spriteL.png";
        checkBounds("left");
    }

    if (directionUp == true) {
        playerY -= movementSpeed;
        myspriteSImage.src = "img/spriteU.png";
        checkBounds("up");
    }

    if (directionDown == true) {
        playerY += movementSpeed;
        myspriteSImage.src = "img/spriteD.png";
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
}


/////////////////////////////////////////////////////////////////
window.addEventListener("keydown", onkeydown);
window.addEventListener("keyup", onkeyup);
setInterval(update, 16.5); // 33 milliseconds = ~ 30 frames per sec
/////////////////////////////////////////////////////////////////
