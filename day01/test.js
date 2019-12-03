import {getAmountOfFuel} from './task01';
import {getAmountOfAccumulatedFuel} from './task02';

test('task 01 example', () => {
    expect(getAmountOfFuel(12)).toBe(2);
    expect(getAmountOfFuel(14)).toBe(2);
    expect(getAmountOfFuel(1969)).toBe(654);
    expect(getAmountOfFuel(100756)).toBe(33583);
});

test('task 02 example', () => {
    expect(getAmountOfAccumulatedFuel(12)).toBe(2);
    expect(getAmountOfAccumulatedFuel(14)).toBe(2);
    expect(getAmountOfAccumulatedFuel(1969)).toBe(966);
    expect(getAmountOfAccumulatedFuel(100756)).toBe(50346);
});
