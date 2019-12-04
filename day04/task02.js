export default (str) =>
{
    const range = String(str).split('-').map(n => Number.parseInt(n));
    let candidate = range[0];
    let counter = 0;
    while (range[0] <= candidate && candidate <= range[1])
    {
        if (check(candidate))
        {
            counter = counter + 1;
        }
        candidate = candidate + 1;
    }

    return counter;
}

export const check = (num) =>
{
    const str = String(num);
    let double = false;
    let duplicationCounter = 1;

    for (let i = 0; i < 5; i++)
    {
        const digit = Number.parseInt(str[i]);
        const nextDigit = Number.parseInt(str[i + 1]);

        if (digit > nextDigit)
            return false;

        if (digit === nextDigit)
            duplicationCounter = duplicationCounter + 1;
        else {
            if (duplicationCounter === 2)
                double = true;
            duplicationCounter = 1;
        }
    }

    if (duplicationCounter === 2)
        double = true;

    return double;
}