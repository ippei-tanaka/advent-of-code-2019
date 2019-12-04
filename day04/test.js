import {check as check01} from './task01';
import {check as check02} from './task02';

test('task 01 example', () => {
    expect(check01('111111')).toBe(true);
    expect(check01('223450')).toBe(false);
    expect(check01('123789')).toBe(false);
});

test('task 02 example', () => {
    expect(check02('112233')).toBe(true);
    expect(check02('123444')).toBe(false);
    expect(check02('111122')).toBe(true);
    expect(check02('677799')).toBe(true);
});
