import task01 from './task01';

test('task 01 example', () => {
    expect(task01('1,0,0,0,99')).toBe('2,0,0,0,99');
    expect(task01('2,3,0,3,99')).toBe('2,3,0,6,99');
    expect(task01('2,4,4,5,99,0')).toBe('2,4,4,5,99,9801');
    expect(task01('1,1,1,4,99,5,6,0,99')).toBe('30,1,1,4,2,5,6,0,99');
});