export default (str, input) =>
{
    const numbers = str.trim().split(',').map(s => Number.parseInt(s));
    let output = [];
    let pointer = 0;

    for (;;)
    {
        const command = extractCommand(numbers[pointer]);
        const opcode = command[0];
        const mode1 = command[1];
        const mode2 = command[2];
        const mode3 = command[3];

        if (opcode === 99)
        {
            break;
        }

        if (opcode === 1 || opcode === 2)
        {
            const value1 = mode1 ? numbers[pointer + 1] : numbers[numbers[pointer + 1]];
            const value2 = mode2 ? numbers[pointer + 2] : numbers[numbers[pointer + 2]];
            const position = numbers[pointer + 3];
            numbers[position] = opcode === 1 ? value1 + value2 : value1 * value2;
            pointer = pointer + 4;
            continue;
        }

        if (opcode === 3)
        {
            const position = numbers[pointer + 1];
            numbers[position] = input;
            pointer = pointer + 2;
            continue;
        }

        if (opcode === 4)
        {
            const value = mode1 ? numbers[pointer + 1] : numbers[numbers[pointer + 1]];
            output = [...output, value];
            pointer = pointer + 2;
            continue;
        }

        break;
    }

    return output[output.length - 1];
}

const extractCommand = (number) =>
{
    let values = [];

    while (number > 0)
    {
        values = [...values, number % 10];
        number = Math.floor(number / 10);
    }

    values = [
        values[0] + (values[1] || 0) * 10,
        ...values.slice(2)
    ];

    while (values.length < 4)
    {
        values = [...values, 0];
    }

    return values;
};