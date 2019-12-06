export default (str) =>
{
    const orbits = String(str).trim().split(/\s+/).map(n => n.split(')'));
    let map = {};

    for (let orbit of orbits)
    {
        const parent = orbit[0];
        const child = orbit[1];
        map = {...map,
            [child]: parent
        };
    }

    let counter = 0;
    for (let [child, parent] of Object.entries(map))
    {
        while (parent)
        {
            child = parent;
            parent = map[parent];
            counter++;
        }
    }

    return counter;
}