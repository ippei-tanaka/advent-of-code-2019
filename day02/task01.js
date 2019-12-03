export default (str) => {
    const array = str.trim().split(',').map(s => Number.parseInt(s));
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
    return array.join(',');
}