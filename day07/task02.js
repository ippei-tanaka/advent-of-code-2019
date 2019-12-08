export default (programStr) =>
{
    const program = programStr.trim().split(',').map(s => Number.parseInt(s));
    const allPhaseSettings = [5, 6, 7, 9, 8];
    let outputCombinations = [];

    for (let phaseSettings of getPermutations(allPhaseSettings))
    {
        const computers = phaseSettings.map((setting, index) => {
            const computer = intcodeComputer([...program], setting)();
            computer.setting = setting;
            computer.index = index;
            computer.next();
            return computer;
        });

        let latestOutput;
        let input = 0;
        let index = 0;

        loop1: while (true)
        {
            const computer = computers[index];

            loop2: while (true) {
                const obj = computer.next(input);
                const {opcode, output} = obj.value || {};

                if (opcode === 4)
                {
                    input = output;
                    latestOutput = output;
                    break loop2;
                }

                if (obj.done)
                {
                    break loop1;
                }
            }
            index = (index + 1) % computers.length;
        }

        outputCombinations = [...outputCombinations, [latestOutput, phaseSettings]];
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
    let pointer = 0;
    let inputCounter = 0;

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
                const input = inputCounter === 0 ? phaseSetting : yield;
                program[position] = input;
                inputCounter = inputCounter + 1;
                pointer = pointer + 2;
                continue;
            }

            if (opcode === 4)
            {
                const value = mode1 ? program[pointer + 1] : program[program[pointer + 1]];
                yield {opcode: 4, output: value};
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