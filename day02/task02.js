export default (str) => {
    const initialArray = str.trim().split(',').map(s => Number.parseInt(s));

    for (let noun = 0; noun < 99; noun++)
    {
        for (let verb = 0; verb < 99; verb++)
        {
            const array = [...initialArray];
            array[1] = noun;
            array[2] = verb;

            for (let i = 0; i < array.length; i = i + 4)
            {
                const command = array[i];
                let value1, value2, position;
                if (command === 1 || command === 2)
                {
                    value1 = array[array[i + 1]];
                    value2 = array[array[i + 2]];
                    position = array[i + 3];
                    array[position] = command === 1 ? value1 + value2 : value1 * value2;
                }
                else if (command === 99)
                {
                    break;
                }
            }

            if (array[0] === 19690720)
            {
                return 100 * noun + verb;
            }
        }
    }
}