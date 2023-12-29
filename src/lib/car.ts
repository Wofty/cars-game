export class Car {
    x: number = 0;
    y: number = 0;
    speed: number = 0;
    size: number = 0;
    color: string = '';
    windowColour: string = '';
    carNumber: number = 0;
    actualSize: number = 0;
    constructor(
        x?: number,
        y?: number,
        speed?: number,
        size?: number,
        color?: string,
        windowColour?: string,
        carNumber?: number
    ) {
        if (x) this.x = x;
        if (y) this.y = y;
        if (speed) this.speed = speed;
        if (size) this.size = size;
        if (color) this.color = color;
        if (windowColour) this.windowColour = windowColour;
        if (carNumber) this.carNumber = carNumber;
        this.actualSize = (this.size / 20) * 45;
    }
    move(canvasWidth: number) {
        this.x += this.speed;
        if (this.x > canvasWidth - this.actualSize) {
            this.x = canvasWidth - this.actualSize;
        }
    }
    hasWon(canvasWidth: number) {
        return this.x + this.actualSize >= canvasWidth;
    }

    draw(ctx: CanvasRenderingContext2D) {
        let s = this.size / 20;

        ctx.lineWidth = 4;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + s * 0, this.y + s * 10);
        ctx.lineTo(this.x + s * 0, this.y + s * 0);
        ctx.lineTo(this.x + s * 25, this.y + s * 0);
        ctx.lineTo(this.x + s * 40, this.y + s * 10);
        ctx.lineTo(this.x + s * 45, this.y + s * 20);
        ctx.lineTo(this.x + s * 0, this.y + s * 20);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.fillStyle = this.windowColour;
        ctx.beginPath();
        ctx.moveTo(this.x + s * 3, this.y + s * 2);
        ctx.lineTo(this.x + s * 3, this.y + s * 10);
        ctx.lineTo(this.x + s * 14, this.y + s * 10);
        ctx.lineTo(this.x + s * 14, this.y + s * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.fillStyle = this.windowColour;
        ctx.beginPath();
        ctx.moveTo(this.x + s * 17, this.y + s * 2);
        ctx.lineTo(this.x + s * 17, this.y + s * 10);
        ctx.lineTo(this.x + s * 36, this.y + s * 10);
        ctx.lineTo(this.x + s * 24, this.y + s * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        this.drawCircle(ctx, this.x + s * 10, this.y + s * 20, s * 5, 'blue');

        this.drawCircle(ctx, this.x + s * 30, this.y + s * 20, s * 5, 'blue');

        /* this.drawCircle(ctx, this.x + s * 20, this.y + s * 15, s * 4, 'white'); */

        ctx.font = '13  px Arial';
        ctx.strokeStyle = 'black';
        ctx.strokeText(
            this.carNumber.toString(),
            this.x + s * 18.5,
            this.y + s * 16.5
        );
        ctx.fillStyle = 'white';
        ctx.fillText(
            this.carNumber.toString(),
            this.x + s * 18,
            this.y + s * 16
        );
    }

    private drawCircle = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        color: string
    ) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    };
}
