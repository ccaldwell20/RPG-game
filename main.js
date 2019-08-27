var R = 1; //RADIUS OF PLAYER TEST CIRCLE

var colortest = '#FF0000'
var playerX = 20;
var playerY = 20;

var directionRight;
var directionLeft;
var directionUp;
var directionDown;
var directionUpLeft;
var directionUpRight;
var directionDownLeft;
var directionDownRight;

var movementSpeed = 0.5;

var codeKeyRight = 68;
var codeKeyLeft = 65;
var codeKeyUp = 87;
var codeKeyDown = 83;

function drawPlayer() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    console.log("Tick");
    var R = 1;
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
    
    else if (e.keyCode == codeKeyLeft) {
        directionLeft = true;
        
    } //left arrow
    
    else if (e.keyCode == codeKeyUp) {
        directionUp = true;
        
    } //up arrow
    
    else if (e.keyCode == codeKeyDown) {
        directionDown = true;
        
    } //down arrow
    
}

function onkeyup(e) {
    if (e.keyCode == codeKeyRight) {
        directionRight = false;
        
    } //right arrow
    else if (e.keyCode == codeKeyLeft) {
        directionLeft = false;
        
    } //left arrow
    else if (e.keyCode == codeKeyUp) {
        directionUp = false;
        
    } //up arrow
    else if (e.keyCode == codeKeyDown) {
        directionDown = false;
        
    } //down arrow
    
    
}

function playerMovement() {
    
    if (directionRight == true) {
        playerX+= movementSpeed;
    } 
    
    else if (directionLeft == true) {
        playerX-= movementSpeed;
    } 
    
    else if (directionUp == true) {
        playerY-= movementSpeed;
    } 
    
    else if (directionDown == true) {
        playerY+= movementSpeed;
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
