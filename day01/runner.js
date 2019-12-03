import fs from "fs";
import {getAmountOfFuel} from './task01';
import {getAmountOfAccumulatedFuel} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const array = data
        .split(/\n/)
        .map(s => Number.parseInt(s))
        .filter(n => !Number.isNaN(n));
    console.log(`Task 01: ${getAmountOfFuel(array)}`);
    console.log(`Task 02: ${getAmountOfAccumulatedFuel(array)}`);
});
