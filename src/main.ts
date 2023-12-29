import { Car } from './lib/car';
import { Colours } from './lib/colour';
import { random } from './lib/random';
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const btn = document.getElementById('btn') as HTMLButtonElement;

const message = document.getElementById('message') as HTMLDivElement;
const ctx = canvas.getContext('2d');

let cars: Array<Car> = new Array<Car>();
let raceOver = false;

let colours: string[] = [];

async function initialize() {
    colours = await Colours();
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    drawCars(colours);
}

document.addEventListener('DOMContentLoaded', initialize);

async function drawCars(colours: string[]) {
    const carWidth = 50; // Width of each car
    const carHeight = 20; // Height of each car
    const totalCars = 4; // Total number of cars
    const totalColour = colours.length; // Total number of colours

    for (let i = 0; i < totalCars; i++) {
        let x = 30; // A fixed distance from the left edge of the canvas
        let y = (canvas.height / totalCars) * i + carHeight / 2; // Equally spaced vertically
        let colorIndex = random(0, totalColour - 1); // Cycle through the colors
        let colour = colours[colorIndex];
        let windowColour = colours[(colorIndex + 1) % totalColour];

        let car = new Car(
            x,
            y,
            random(1, 5),
            carWidth,
            colour,
            windowColour,
            i + 1
        );
        cars.push(car);
        car.draw(ctx as CanvasRenderingContext2D);
    }
}

// ... (rest of your event listeners and functions) ...

// Start the race
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

        // Check for the winner if not already declared
        if (!raceOver && car.hasWon(canvas.width)) {
            message.innerHTML = `Car ${car.carNumber} has won!`;

            raceOver = true;
            // Additional logic for when the winner is found
        }
    }

    // If not all cars have finished, keep updating
    if (!allCarsFinished) {
        requestAnimationFrame(updateRace);
    }
}

btn.addEventListener('click', () => {
    cars = [];
    raceOver = false;
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    drawCars(colours);
    startRace();
});
