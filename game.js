
let ballX = 50;
let canvasBorder;
let ballSpeedX = 5 

window.onload = function() {
    canvas = document.querySelector('#gameCanvas');
    canvasBorder = canvas.getContext('2d'); 


    let framesPerSecond = 30;
    setInterval(function() {
        moveShapes( );
        shapes();
    }, 1000/framesPerSecond);
}

function moveShapes() {
    ballX += ballSpeedX;
    if(ballX >= 800){
        ballSpeedX =  -ballSpeedX;
    }
    if(ballX < 0) {
        ballSpeedX = -ballSpeedX;
    }
} 


function shapes() {

    canvasBorder.fillStyle = 'black';
    canvasBorder.fillRect(0,0,canvas.width,canvas.height);
    canvasBorder.fillStyle = 'white';
    canvasBorder.fillRect(0,200,10,100)
    //BALL
    canvasBorder.fillStyle = ('white');
    canvasBorder.beginPath();
    canvasBorder.arc(ballX, 100,10,0,Math.PI * 2, true);
    canvasBorder.fill();
}