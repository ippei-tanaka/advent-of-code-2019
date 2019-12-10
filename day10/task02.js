export default (programStr, input) =>
{
    const program = programStr.trim().split(',').map(s => Number.parseInt(s));

    const computer = intcodeComputer([...program])();
    computer.next();

    // const input = 1;
    let outputArray = [];

    while (true) {
        const obj = computer.next(input);
        const {opcode, output} = obj.value || {};

        if (opcode === 4)
        {
            // input = output;
            // console.log(output);
            outputArray = [...outputArray, output];
        }

        if (obj.done)
        {
            break;
        }
    }

    return outputArray.length <= 1 ? outputArray[0] : outputArray;
};

const intcodeComputer = (program) =>
{
    let pointer = 0;
    let relativeBase = 0;

    return function* ()
    {
        yield;
        for (;;)
        {
            const command = extractCommand(program[pointer]);
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
                const value1 = getValueWithMode(program, mode1, pointer + 1, relativeBase);
                const value2 = getValueWithMode(program, mode2, pointer + 2, relativeBase);
                const position = getValueWithModeForWrite(program, mode3, pointer + 3, relativeBase);
                program[position] = opcode === 1 ? value1 + value2 : value1 * value2;
                pointer = pointer + 4;
                continue;
            }

            if (opcode === 3)
            {
                const position = getValueWithModeForWrite(program, mode1, pointer + 1, relativeBase);
                const input = yield;
                program[position] = input;
                pointer = pointer + 2;
                continue;
            }

            if (opcode === 4)
            {
                const value = getValueWithMode(program, mode1, pointer + 1, relativeBase);
                yield {opcode: 4, output: value};
                pointer = pointer + 2;
                continue;
            }

            if (opcode === 5 || opcode === 6)
            {
                const value1 = getValueWithMode(program, mode1, pointer + 1, relativeBase);
                const value2 = getValueWithMode(program, mode2, pointer + 2, relativeBase);
                if (opcode === 5 && value1) pointer = value2;
                else if (opcode === 6 && !value1) pointer = value2;
                else pointer = pointer + 3;
                continue;
            }

            if (opcode === 7)
            {
                const value1 = getValueWithMode(program, mode1, pointer + 1, relativeBase);
                const value2 = getValueWithMode(program, mode2, pointer + 2, relativeBase);
                const position = getValueWithModeForWrite(program, mode3, pointer + 3, relativeBase);
                program[position] = value1 < value2 ? 1 : 0;
                pointer = pointer + 4;
                continue;
            }

            if (opcode === 8)
            {
                const value1 = getValueWithMode(program, mode1, pointer + 1, relativeBase);
                const value2 = getValueWithMode(program, mode2, pointer + 2, relativeBase);
                const position = getValueWithModeForWrite(program, mode3, pointer + 3, relativeBase);
                program[position] = value1 === value2 ? 1 : 0;
                pointer = pointer + 4;
                continue;
            }

            if (opcode === 9)
            {
                const value = getValueWithMode(program, mode1, pointer + 1, relativeBase);
                relativeBase = relativeBase + value;
                pointer = pointer + 2;
                continue;
            }

            break;
        }
    }
}

const getValueWithMode = (program, mode, position, relativeBase) =>
{
    let value;
    switch (mode) {
        case 0:
            value = program[program[position]];
            break;
        case 1:
            value = program[position];
            break;
        case 2:
            value = program[relativeBase + program[position]];
            break;
        default:
    }
    return typeof value === 'undefined' ? 0 : value;
}

const getValueWithModeForWrite = (program, mode, position, relativeBase) =>
{
    let value;
    switch (mode) {
        case 0:
            // value = program[program[position]];
            // break;
        case 1:
            value = program[position];
            break;
        case 2:
            value = relativeBase + program[position];
            break;
        default:
    }
    return typeof value === 'undefined' ? 0 : value;
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