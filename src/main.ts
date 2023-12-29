import { Car } from './lib/car';
import { Colours } from './lib/colour';
import { random } from './lib/random';
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const btn = document.getElementById('btn') as HTMLButtonElement;
const reset = document.getElementById('reset') as HTMLButtonElement;
const message = document.getElementById('message') as HTMLDivElement;
const ctx = canvas.getContext('2d');

let cars: Array<Car> = new Array<Car>();
let raceOver = false;

let colours: string[] = [];

async function initialise() {
    colours = await Colours();
    initialiseCars(colours);
    drawCars();
}

function resetGame() {
    window.location.reload();
}

function initialiseCars(colours: any) {
    const carWidth = 50;
    const carHeight = 20;
    const totalCars = 4;
    const totalColour = colours.length;

    for (let i = 0; i < totalCars; i++) {
        let x = 30;
        let y = (canvas.height / totalCars) * i + carHeight / 2;
        let colorIndex = random(0, totalColour - 1);
        let colour = colours[colorIndex];
        let windowColour = colours[(colorIndex + 1) % totalColour];
        let car = new Car(
            x,
            y,
            random(1, 6),
            carWidth,
            colour,
            windowColour,
            i + 1
        );
        cars.push(car);
    }
}

function drawCars() {
    cars.forEach((car) => {
        car.draw(ctx as CanvasRenderingContext2D);
    });
}

function startRace() {
    raceOver = false;
    requestAnimationFrame(updateRace);
}

function updateRace() {
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    let allCarsFinished = true;

    for (const car of cars) {
        if (!car.hasWon(canvas.width)) {
            car.speed = random(1, 6);
            car.move(canvas.width);
            allCarsFinished = false;
        }
        car.draw(ctx as CanvasRenderingContext2D);

        if (!raceOver && car.hasWon(canvas.width)) {
            message.innerHTML = `Car ${car.carNumber} has won!`;
            btn.classList.add('hidden');
            reset.classList.remove('hidden');

            raceOver = true;
        }
    }

    if (!allCarsFinished) {
        requestAnimationFrame(updateRace);
    }
}

btn.addEventListener('click', () => {
    raceOver = false;
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    drawCars();
    startRace();
});
reset.addEventListener('click', () => {
    resetGame();
});
document.addEventListener('DOMContentLoaded', initialise);
