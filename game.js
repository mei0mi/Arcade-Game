//VARIABLES
let canvas;
let canvasBorder;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 5; 
let ballSpeedY = 5;
let paddle2YSpeed = 5;
let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

//FUNCTIONS

window.onload = function() {
    canvas = document.querySelector('#gameCanvas');
    canvasBorder = canvas.getContext('2d'); 


    let framesPerSecond = 30;
    setInterval(function() {
        moveShapes( );
        shapes();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mouseover', function(event){
        var mousePos = calculateMousePos(event);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    })

    computerMoving()
}

function calculateMousePos(event){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    }
}

function ballReset(){
    ballSpeedX = -ballSpeedX
    ballX = canvas.width/2;
    ballY = canvas.height/2; 
}

function computerMoving() {
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);

    if(paddle2YCenter < ballY){
        paddle2Y += paddle2YSpeed;
    } else if(paddle2YCenter > paddle2Y){
        paddle2Y -= paddle2YSpeed;
    }

    //MAKING SURE THAT PADDLE2Y STAYS IN THE CANVAS 
    if(paddle2Y < 0){
        paddle2Y = 0;
    } else if(paddle2Y > canvas.height){
        paddle2Y = -paddle2Y;
    }
}



function moveShapes() {
    computerMoving()


    //MOVING THE BALL
    ballY += ballSpeedY;
    ballX += ballSpeedX;

    if(ballX > canvas.width){
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
        } 
        else {ballReset()};
    }
    if(ballX < 0) {
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
        } 
        else {ballReset()}
    }

    if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY;
    }
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }


} 


function shapes() {

    //DRAWING THE CANVAS
    canvasBorder.fillStyle = 'black';
    canvasBorder.fillRect(0,0,canvas.width,canvas.height);

    //LEFT PADDLE 
    canvasBorder.fillStyle = 'white';
    canvasBorder.fillRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT);

    //RIGHT PADDLE
    canvasBorder.fillStyle = 'white';
    canvasBorder.fillRect(canvas.width - PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT);

    //BALL
    canvasBorder.fillStyle = ('white');
    canvasBorder.beginPath();
    canvasBorder.arc(ballX, ballY,10,0,Math.PI * 2, true);
    canvasBorder.fill();
}
