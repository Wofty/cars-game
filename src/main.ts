const canvas = document.getElementById('canvas') as HTMLCanvasElement;
if (!canvas) {
    console.error('Canvas element not found');
    (() => {
        return;
    })();
}
const ctx = canvas.getContext('2d');
if (!ctx) {
    console.error('Unable to get canvas context');
    (() => {
        return;
    })();
}
let x = 10;
let y = 10;
let dx = 2;
let ballRadius = 10;

function drawBall() {
    if (ctx) {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }
}

function draw() {
    console.log('Drawing', x, y, canvas.width, canvas.height);
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = 0; // Stop updating x position
        }
        x += dx;
    }
}

setInterval(draw, 10);
