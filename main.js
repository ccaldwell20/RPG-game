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

var movementSpeed = 5;

function drawPlayer() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    console.log("Tick");
    var R = 15;
    ctx.beginPath();
    ctx.arc(playerX, playerY, R, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = colortest;
    ctx.stroke();

}



function onkeydown(e) {
    if (e.keyCode == codeKeyRight) {
        directionRight = true;

    } //right arrow
    if (e.keyCode == codeKeyLeft) {
        directionLeft = true;

    } //left arrow

    if (e.keyCode == codeKeyUp) {
        directionUp = true;

    } //up arrow

    if (e.keyCode == codeKeyDown) {
        directionDown = true;

    } //down arrow


}

function onkeyup(e) {
    if (e.keyCode == codeKeyRight) {
        directionRight = false;

    } //right arrow
    if (e.keyCode == codeKeyLeft) {
        directionLeft = false;

    } //left arrow
    if (e.keyCode == codeKeyUp) {
        directionUp = false;

    } //up arrow
    if (e.keyCode == codeKeyDown) {
        directionDown = false;

    } //down arrow

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



//LOAD IMAGE
//function loadBackgroundImg() {
//    var img = new Image();
//    img.src = "https://dummyimage.com/1920x1080/999/fff.jpg";
//    var canvas = document.getElementById("myCanvas");
//    var ctx = canvas.getContext("2d");
//    ctx.drawImage(img, 10, 10);
//}
//loadBackgroundImg();








function update() {
    drawPlayer();
    playerMovement();
}





/////////////////////////////////////////////////////////////////
window.addEventListener("keydown", onkeydown);
window.addEventListener("keyup", onkeyup);
setInterval(update, 16.5); // 33 milliseconds = ~ 30 frames per sec
/////////////////////////////////////////////////////////////////
