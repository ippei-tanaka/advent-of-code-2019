import task01 from './task01';
import task02 from './task02';

test('task 01 example', () => {
    expect(task01('123456789012', 3, 2)).toEqual(1);
});

test('task 02 example', () => {
    expect(task02('0222112222120000', 2, 2)).toEqual('0110');
});

