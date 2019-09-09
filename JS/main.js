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


        image2 = new Image();
        image2.src = "img/collision_map_1.jpg";
        mycollisionmapImage = image2;
        console.log(mycollisionmapImage);

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
            inRange(getPixel('./bg.png', xPos, yPos, "blue"), 249, 255) == true) {
            console.log("BOUND");
            playerY += movementSpeed;
        }
        if(inRange(getPixel('./bg.png', xPos, yPos, "red"), 228, 238) &&
            inRange(getPixel('./bg.png', xPos, yPos, "green"), 0, 4) &&
            inRange(getPixel('./bg.png', xPos, yPos, "blue"), 249, 255) == true){
           
           }
    }

    if (direction == "down") {
        xPos = playerX;
        yPos = playerY + 30;

        if (inRange(getPixel('./bg.png', xPos, yPos, "red"), 228, 238) &&
            inRange(getPixel('./bg.png', xPos, yPos, "green"), 0, 4) &&
            inRange(getPixel('./bg.png', xPos, yPos, "blue"), 249, 255) == true) {
            console.log("BOUND");
            playerY -= movementSpeed;
        }
    }

    if (direction == "left") {
        xPos = playerX;
        yPos = playerY;

        if (inRange(getPixel('./bg.png', xPos, yPos, "red"), 228, 238) || inRange(getPixel('./bg.png', xPos, yPos+30, "red"), 228, 238) &&
            inRange(getPixel('./bg.png', xPos, yPos, "green"), 0, 4) || inRange(getPixel('./bg.png', xPos, yPos+30, "green"), 0, 4) &&
            inRange(getPixel('./bg.png', xPos, yPos, "blue"), 249, 255) || inRange(getPixel('./bg.png', xPos, yPos+30, "blue"), 249, 255) == true) {
            console.log("BOUND");
            playerX += movementSpeed;
        }
        

    }
    if (direction == "right") {
        xPos = playerX+30;
        yPos = playerY;

        if (inRange(getPixel('./bg.png', xPos, yPos, "red"), 228, 238) || inRange(getPixel('./bg.png', xPos, yPos+30, "red"), 228, 238) &&
            inRange(getPixel('./bg.png', xPos, yPos, "green"), 0, 4) || inRange(getPixel('./bg.png', xPos, yPos+30, "green"), 0, 4) &&
            inRange(getPixel('./bg.png', xPos, yPos, "blue"), 249, 255) || inRange(getPixel('./bg.png', xPos, yPos+30, "blue"), 249, 255) == true) {
            console.log("BOUND");
            playerX -= movementSpeed;
        }


    }


}

var bound = 0;

function checkMapColorValue(area) {
    var area = area;
    if (area == "test") {

        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 250, 255) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 118, 124) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 0, 3) == true) {

            console.log("ORANGE");


        }
        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 250, 255) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 0, 3) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 185, 193) == true) {

            console.log("VIOLET");


        }
        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 109, 115) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 188, 194) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 0, 6) == true) {

            console.log("LIME-GREEN");



        }
        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 62, 68) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 28, 34) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 188, 194) == true) {
            console.log("BLUE");

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
    ctx.globalAlpha = 0.7;


    ctxTwo = cTwo.getContext("2d");
    ctxTwo.clearRect(0, 0, cTwo.width, cTwo.height);
    ctxTwo.drawImage(mycollisionmapImage, 0, 0, cTwo.width, cTwo.height);


    ctx.beginPath();
    ctx.drawImage(myspriteSImage, playerX, playerY);
    ctx.stroke();
    showColor();
    checkMapColorValue("test");
    //console.log(getPixel('./bg.png', playerX, playerY,"red")); // [255, 255, 255, 0];


}



function onkeydown(e) {
    //RIGHT ARROW
    if (e.keyCode == codeKeyRight) {
        directionRight = true;
          document.getElementById('myWalking').play();
    } else if (e.keyCode == codeKeyRightA) {
        directionRight = true;
    }


    //LEFT ARROW
    if (e.keyCode == codeKeyLeft) {
        directionLeft = true;
          document.getElementById('myWalking').play();
    } else if (e.keyCode == codeKeyLeftA) {
        directionLeft = true;
    }


    //UP ARROW
    if (e.keyCode == codeKeyUp) {
        directionUp = true;
          document.getElementById('myWalking').play();
    } else if (e.keyCode == codeKeyUpA) {
        directionUp = true;
    }


    //DOWN ARROW
    if (e.keyCode == codeKeyDown) {
          document.getElementById('myWalking').play();
        directionDown = true;
    } else if (e.keyCode == codeKeyDownA) {
        directionDown = true;
    }


}

function onkeyup(e) {
    //RIGHT ARROW
    if (e.keyCode == codeKeyRight) {
        directionRight = false;
          document.getElementById('myWalking').pause();
        myspriteSImage.src = "img/spriteR.png";
    } else if (e.keyCode == codeKeyRightA) {
        directionRight = false;
    }


    //LEFT ARROW
    if (e.keyCode == codeKeyLeft) {
        directionLeft = false;
            document.getElementById('myWalking').pause();
    } else if (e.keyCode == codeKeyLeftA) {
        directionLeft = false;
    }


    //UP ARROW
    if (e.keyCode == codeKeyUp) {
        directionUp = false;
            document.getElementById('myWalking').pause();
    } else if (e.keyCode == codeKeyUpA) {
        directionUp = false;
    }


    //DOWN ARROW
    if (e.keyCode == codeKeyDown) {
        directionDown = false;
            document.getElementById('myWalking').pause();
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









function update() {
    drawPlayer();
    playerMovement();
}


/////////////////////////////////////////////////////////////////
window.addEventListener("keydown", onkeydown);
window.addEventListener("keyup", onkeyup);
setInterval(update, 16.5); // 33 milliseconds = ~ 30 frames per sec
/////////////////////////////////////////////////////////////////
