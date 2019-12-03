export default (str) =>
{
    const paths = str
        .trim()
        .split(/\s+/)
        .map(s => s.trim().split(',').map(r => r.trim()));

    const array2D = new Array2D();
    let combindedSteps = [];
    let pathNumber = 0;

    for (let path of paths)
    {
        let currentX = 0;
        let currentY = 0;
        let steps = 0;
        array2D.setValue(currentX, currentY, pathNumber);

        for (let command of path)
        {
            const direction = command[0];
            const distance = Number.parseInt(command.substring(1));
            let vx = 0;
            let vy = 0;

            switch (direction) {
                case 'R':
                    vx = 1;
                    break;
                case 'L':
                    vx = -1;
                    break;
                case 'U':
                    vy = 1;
                    break;
                case 'D':
                    vy = -1;
                    break;
                default:
            }

            for (let i = 0; i < distance; i++)
            {
                currentX = currentX + vx;
                currentY = currentY + vy;
                steps++;

                const existingValue = array2D.getValue(currentX, currentY);

                if (existingValue && pathNumber !== existingValue.pathNumber)
                {
                    combindedSteps = [...combindedSteps, existingValue.steps + steps];
                }
                else if (!existingValue)
                {
                    array2D.setValue(currentX, currentY, {pathNumber, steps});
                }
            }
        }

        pathNumber = pathNumber + 1;
    }

    combindedSteps.sort((a, b) => a - b);
    return combindedSteps[0];
}

class Array2D
{
    constructor ()
    {
        this.array2D = {};
    }

    setValue (x, y, value)
    {
        this.array2D[x] = this.array2D[x] || {};
        this.array2D[x][y] = value;
    }

    getValue (x, y)
    {
        try {
            return this.array2D[x][y];
        } catch (e)
        {
            return undefined;
        }
    }
}