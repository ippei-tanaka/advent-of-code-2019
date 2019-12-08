import fs from "fs";
import task01 from './task01';
import task02 from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Task 01: ${task01(data)[0]}`);
    console.log(`Task 02: ${task02(data)[0]}`);
    // console.log(`Task 02: ${task02('3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0')}`);
    // console.log(`Task 02: ${task02('3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5')}`);
});
