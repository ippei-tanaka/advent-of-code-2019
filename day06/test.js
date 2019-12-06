import task01 from './task01';
import task02 from './task02';

test('task 01 example', () => {
    expect(task01(`
        COM)B
        B)C
        C)D
        D)E
        E)F
        B)G
        G)H
        D)I
        E)J
        J)K
        K)L
        `)).toBe(42);
});

test('task 02 example', () => {
    expect(task02(`
        COM)B
        B)C
        C)D
        D)E
        E)F
        B)G
        G)H
        D)I
        E)J
        J)K
        K)L
        K)YOU
        I)SAN
        `)).toBe(4);
});
