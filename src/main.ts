let canvas = document.getElementById('canvas') as HTMLCanvasElement;

let ctx = canvas.getContext('2d');

if (ctx) {
    ctx.fillRect(10, 100, 100, 100);
    ctx.fillRect(10, 10, 100, 100);
}
