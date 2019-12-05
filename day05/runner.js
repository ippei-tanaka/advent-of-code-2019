import fs from "fs";
import task01 from './task01';
import task02 from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Task 01: ${task01(data, 1)}`);
    console.log(`Task 02: ${task02(data, 5)}`);
});
