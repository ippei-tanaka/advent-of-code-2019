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
    for (let i = 0; i < 5; i++)
    {
        const digit = str[i];
        const nextDigit = str[i + 1];

        if (digit > nextDigit)
            return false;

        if (digit === nextDigit)
            double = true;
    }

    return double;
}