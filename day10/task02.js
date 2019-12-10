export default (mapStr) =>
{
    const map = mapStr.trim().split(/\s+/).map((str) => str.split(''));
    const flattenedMap = map.reduce((memo, arr, y) => [...memo, ...arr.map((value, x) => ({x, y, value}))], []);
    const asteroids = flattenedMap.filter(l => l.value === "#");
    const width = map[0].length;
    const height = map.length;
    let visibleAsteroidCounters = [];

    for (let {x:fromX, y:fromY} of asteroids)
    {
        let visibleAsteroidCounter = {x: fromX, y: fromY, count: 0, visibles: []};

        for (let {x :toX, y :toY} of asteroids)
        {
            if (fromX === toX && fromY === toY)
            {
                continue;
            }
            const vX = toX - fromX;
            const vY = toY - fromY;
            // const distance = Math.sqrt(vX * vX + vY * vY);
            const isEitherFromOrTo = a => (a.x === toX && a.y === toY) || (a.x === fromX && a.y === fromY);
            const restAsteroids = asteroids.filter(a => !isEitherFromOrTo(a));
            let visible = true;
            // console.log(`x:${fromX} y:${fromY} -> x:${toX} y:${toY}`);
            // console.log(restAsteroids);

            if (vX === 0) {
                const step = Math.sign(vY);
                const isBeteen = between(fromY, toY);
                for (let y = fromY + step; isBeteen(y); y = y + step)
                {
                    // fromX === 4 && fromY === 2 && console.log(y);
                    const blockage = restAsteroids.find(a => fromX === a.x && y === a.y);
                    // fromX === 4 && fromY === 2 && console.log(blockage);
                    if (blockage) {
                        visible = false;
                        break;
                    }
                }
            } else {
                const slope = vY / vX;
                const yIntercept = fromY - (slope * fromX);
                const step = Math.sign(vX);
                const isBeteen = between(fromX, toX);
                for (let x = fromX + step; isBeteen(x); x = x + step)
                {
                    let y = slope * x + yIntercept;
                    if (Math.floor((y * 100) % 100) === 99 || Math.floor((y * 100) % 100) === 0)
                    {
                        y = Math.round(y);
                    }
                    const blockage = restAsteroids.find(a => x === a.x && y === a.y);
                    if (blockage) {
                        visible = false;
                        break;
                    }
                }
            }

            if (visible)
            {
                visibleAsteroidCounter.count++;
                visibleAsteroidCounter.visibles = [...visibleAsteroidCounter.visibles, {x :toX, y :toY}];
            }
        }

        visibleAsteroidCounters = [...visibleAsteroidCounters, visibleAsteroidCounter];
    }

    // const counterDisplay = map.reduce((memo1, arr, y) => memo1 + '\n' + arr.reduce((memo2, value, x) => {
    //     const asteroud = visibleAsteroidCounters.find(i => i.x === x && i.y === y);
    //     return memo2 + (asteroud ? String(asteroud.count) : value);
    // }, ''), '');
    // console.log(counterDisplay);
    //
    const aCounter = visibleAsteroidCounters.find(a => a.x === 11 && a.y === 13);
    if (aCounter) {
        const counterDisplay2 = map.reduce((memo1, arr, y) => memo1 + '\n' + arr.reduce((memo2, value, x) => {
            let displayedValue = value;
            if (aCounter.x === x && aCounter.y === y) displayedValue = '¶';//aCounter.count;
            if (aCounter.visibles.find(i => i.x === x && i.y === y)) displayedValue = 'o';
            return memo2 + displayedValue;
        }, ''), '');
        // console.log(aCounter);
        // console.log(counterDisplay2);
    }

    visibleAsteroidCounters.sort((a, b) => b.count - a.count);

    const {x: stationX, y: stationY} = visibleAsteroidCounters[0];

    // console.log(stationX, stationY);

    const asteroidsWithAngles = asteroids.filter(a => a.x !== stationX || a.y !== stationY).map(a => {
        const v1 = {x: 0, y: -1};
        const v2 = {x: a.x - stationX, y: a.y - stationY};
        const dot = v1.x * v2.x  + v1.y * v2.y;
        const det = v1.x * v2.y  - v1.y * v2.x;
        let angle = Math.atan2(det, dot) * 180 / Math.PI;
        if (angle < 0) angle = 180 + Math.abs(180 + angle);
        return {...a, angle};
    });

    // console.log(asteroids.filter(a => a.x !== stationX || a.y !== stationY));

    asteroidsWithAngles.sort((a, b) => {
        const aDiff = a.angle - b.angle;
        if (aDiff) return aDiff;
        const aDis = Math.sqrt(Math.pow(a.x - stationX, 2) + Math.pow(a.y - stationY, 2));
        const bDis = Math.sqrt(Math.pow(b.x - stationX, 2) + Math.pow(b.y - stationY, 2));
        return aDis - bDis;
    });

    const sortedAsteroids = asteroidsWithAngles.reduce((memo, a) => {
        if (memo.length === 0) return [[a]];
        if (memo[memo.length - 1][0].angle === a.angle) {
            memo[memo.length - 1] = [...memo[memo.length - 1], a];
            return memo;
        } else {
            return [...memo, [a]];
        }
    }, []);

    // console.log(sortedAsteroids);

    let destroyedAsteroids = [];
    let destroyedAsteroid;
    let prevAngle;
    while (sortedAsteroids.length)
    {
        const arr = sortedAsteroids.shift();

        destroyedAsteroids = [...destroyedAsteroids, arr.shift()];

        if (arr.length !== 0)
        {
            sortedAsteroids.push(arr);
        }
    }

    // console.log(destroyedAsteroids);

    return destroyedAsteroids[199];
};

const between = (a, b, inclusive = false) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return value => {
        return inclusive ? value >= min && value <= max : value > min && value < max;
    }
}