const calculate = mass => Math.floor(mass / 3) - 2;

export const getAmountOfFuel = (mass) => {
    const array = Array.isArray(mass) ? mass : [mass];
    return array.map(calculate).reduce((memo, item) => memo + item, 0);
}
