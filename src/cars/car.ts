export class Car {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;
    speed: number = 0;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        speed: number
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    move() {
        this.x += this.speed;
    }
}
