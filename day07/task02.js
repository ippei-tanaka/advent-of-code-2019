export default (programStr) =>
{
    const program = programStr.trim().split(',').map(s => Number.parseInt(s));
    const allPhaseSettings = [0, 1, 2, 3, 4];
    // const allPhaseSettings = [5, 6, 7, 8, 9];
    let outputCombinations = [];

    for (let phaseSettings of getPermutations(allPhaseSettings))
    {
        let input = 0;
        let output;
        const computers = phaseSettings.map(setting => intcodeComputer(program, setting));

        for (let i = 0; i < computers.length; i++)
        {
            const computer = computers[i];
            output = computer(() => input);
            input = output;
        }

        outputCombinations = [...outputCombinations, [output, phaseSettings]];
    }

    outputCombinations.sort((a, b) => b[0] - a[0]);

    // console.log(outputCombinations.slice(0, 10));

    return outputCombinations[0];
};

const getPermutations = (array) =>
{
    if (array.length < 2) return false;
    if (array.length === 2) return [ [array[0], array[1]], [array[1], array[0]] ];

    let permutations = [];
    for (let i = 0; i < array.length; i++)
    {
        const rest = [...array.slice(0, i), ...array.slice(i + 1)];
        const restPermutations = getPermutations(rest);
        if (restPermutations) for (let restPermutation of restPermutations)
        {
            permutations = [...permutations, [array[i], ...restPermutation]];
        }
    }
    return permutations;
};

const intcodeComputer = (program, phaseSetting) =>
{
    let output = [];
    let pointer = 0;
    let inputCounter = 0;

    return (getInput) =>
    {
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
                const value1 = mode1 ? program[pointer + 1] : program[program[pointer + 1]];
                const value2 = mode2 ? program[pointer + 2] : program[program[pointer + 2]];
                const position = program[pointer + 3];
                program[position] = opcode === 1 ? value1 + value2 : value1 * value2;
                pointer = pointer + 4;
                continue;
            }

            if (opcode === 3)
            {
                const position = program[pointer + 1];
                program[position] = inputCounter === 0 ? phaseSetting : getInput();
                inputCounter = inputCounter + 1;
                pointer = pointer + 2;
                continue;
            }

            if (opcode === 4)
            {
                const value = mode1 ? program[pointer + 1] : program[program[pointer + 1]];
                output = [...output, value];
                pointer = pointer + 2;
                continue;
            }

            if (opcode === 5 || opcode === 6)
            {
                const value1 = mode1 ? program[pointer + 1] : program[program[pointer + 1]];
                const value2 = mode2 ? program[pointer + 2] : program[program[pointer + 2]];
                const position = program[pointer + 2];
                if (opcode === 5 && value1) pointer = value2;
                else if (opcode === 6 && !value1) pointer = value2;
                else pointer = pointer + 3;
                continue;
            }

            if (opcode === 7)
            {
                const value1 = mode1 ? program[pointer + 1] : program[program[pointer + 1]];
                const value2 = mode2 ? program[pointer + 2] : program[program[pointer + 2]];
                const position = program[pointer + 3];
                program[position] = value1 < value2 ? 1 : 0;
                pointer = pointer + 4;
                continue;
            }

            if (opcode === 8)
            {
                const value1 = mode1 ? program[pointer + 1] : program[program[pointer + 1]];
                const value2 = mode2 ? program[pointer + 2] : program[program[pointer + 2]];
                const position = program[pointer + 3];
                program[position] = value1 === value2 ? 1 : 0;
                pointer = pointer + 4;
                continue;
            }

            break;
        }

        return output[output.length - 1];
    }

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