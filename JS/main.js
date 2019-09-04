var R = 1; //RADIUS OF PLAYER TEST CIRCLE

var colortest = '#FF0000'
var playerX = 915;
var playerY = 525;
var playerXorigin = 915;
var playerYorigin = 525;
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
        image2.src = "img/collision_map.jpg";
        mycollisionmapImage = image2;
        console.log(mycollisionmapImage);
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

var bound = 0;

function checkMapColorValue(area) {
    var area = area;
    if (area == "test") {

        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 250, 255) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 88, 94) &&
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
            movementSpeed = 10;



        }
        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 62, 68) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 28, 34) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 188, 194) == true) {
            console.log("BLUE");

        }
        if (inRange(getPixel('./bg.png', playerX, playerY, "red"), 0, 0) &&
            inRange(getPixel('./bg.png', playerX, playerY, "green"), 0, 0) &&
            inRange(getPixel('./bg.png', playerX, playerY, "blue"), 0, 0) &&
            inRange(getPixel('./bg.png', playerX, playerY, "trans"), 0, 0) == true) {
            console.log("BOUND");
            bound += 1
            
            if (directionRight == true) {
                playerX -= 30;
                bound = 0;
            }

            if (directionLeft == true) {
                playerX += 30;
                bound = 0;
            }

            if (directionUp == true) {
                playerY += 30;
                bound = 0;
            }

            if (directionDown == true) {
                playerY -= 30;
                bound = 0;
            }
            
            if (bound >= 50){
                
                playerX = playerXorigin;
                playerY = playerYorigin;
                
            }

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
    
    
    ctxTwo = cTwo.getContext("2d");
    ctxTwo.clearRect(0, 0, cTwo.width, cTwo.height);
    ctxTwo.drawImage(mycollisionmapImage, 0, 0, cTwo.width, cTwo.height);
    
    
    var R = 6;
    ctx.beginPath();
    ctx.arc(playerX, playerY, R, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = colortest;
    ctx.stroke();
    showColor();
    checkMapColorValue("test");
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
    }

    if (directionLeft == true) {
        playerX -= movementSpeed;
    }

    if (directionUp == true) {
        playerY -= movementSpeed;
    }

    if (directionDown == true) {
        playerY += movementSpeed;
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
