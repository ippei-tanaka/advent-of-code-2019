const calculate = mass => {
    const fuel = Math.floor(mass / 3) - 2;
    const additionalFuel = fuel > 6 ? calculate(fuel) : 0;
    return fuel + additionalFuel;
}

export const getAmountOfAccumulatedFuel = (mass) => {
    const array = Array.isArray(mass) ? mass : [mass];
    return array.map(calculate).reduce((memo, item) => memo + item, 0);
}
