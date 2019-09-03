var R = 1; //RADIUS OF PLAYER TEST CIRCLE

var colortest = '#FF0000'
var playerX = 0;
var playerY = 0;
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

var PicList = new Array("map"); // A "list" of PNG images to load

var image;
var ImagesLoaded = 0;



function initCanvas() {

    c = document.getElementById("myCanvas");
    CanHeight = c.height;
    CanWidth = c.width;


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

function ImageLoaded() // Test to see if all images are loaded. (You might put a progress meter in here)
{
    ImagesLoaded++;
    if (ImagesLoaded == PicList.length) {
        console.log("The images have been preloaded.");
        image = new Image();
        image.src = "img/map.jpg";
        mymapImage = image;
        console.log(mymapImage);
    }
}



function getPixel(url, x, y, colorv) {
    if (colorv == "red") {
        return ctx.getImageData(x, y, 1, 1).data[0];
    } else if (colorv == "green") {
        return ctx.getImageData(x, y, 1, 1).data[1];
    } else if (colorv == "blue") {
        return ctx.getImageData(x, y, 1, 1).data[2];
    } else if (colorv == "trans") {
        return ctx.getImageData(x, y, 1, 1).data[3];
    } else if (colorv == "all") {
        return ctx.getImageData(x, y, 1, 1).data;
    }
}

function checkMapColorValue(area) {
    var area = area;
    if(area == "test"){
    if (getPixel('./bg.png', playerX, playerY, "red") == 255 &&
        getPixel('./bg.png', playerX, playerY, "green") == 91 &&
        getPixel('./bg.png', playerX, playerY, "blue") == 0) {
        
        console.log("ORANGE");
        

    } else if (getPixel('./bg.png', playerX, playerY, "red") == 255 &&
        getPixel('./bg.png', playerX, playerY, "green") == 0 &&
        getPixel('./bg.png', playerX, playerY, "blue") == 189) {
        
        console.log("VIOLET");
        

    } else if (getPixel('./bg.png', playerX, playerY, "red") == 112 &&
        getPixel('./bg.png', playerX, playerY, "green") == 191 &&
        getPixel('./bg.png', playerX, playerY, "blue") == 3) {
        
        console.log("LIME-GREEN");
        

    } else if (getPixel('./bg.png', playerX, playerY, "red") == 65 &&
        getPixel('./bg.png', playerX, playerY, "green") == 31 &&
        getPixel('./bg.png', playerX, playerY, "blue") == 191) {
        
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
    var R = 6;
    ctx.beginPath();
    ctx.arc(playerX, playerY, R, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = colortest;
    ctx.stroke();
    showColor();
    checkMapColorValue("test");
    console.log(getPixel('./bg.png', playerX, playerY,"red")); // [255, 255, 255, 0];




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
