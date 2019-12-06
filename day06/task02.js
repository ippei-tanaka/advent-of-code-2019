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

    // console.log(map);

    let YOU_Parent = map.YOU;
    let YOU_Child = 'YOU';
    let YOU_Trace = [YOU_Parent];
    while (YOU_Parent)
    {
        YOU_Child = YOU_Parent;
        YOU_Parent = map[YOU_Parent];
        YOU_Trace = [...YOU_Trace, YOU_Parent];
    }

    // console.log(YOU_Trace);

    let SAN_Parent = map.SAN;
    let SAN_Child = 'SAN';
    let SAN_Trace = [SAN_Parent];
    while (SAN_Parent)
    {
        SAN_Child = SAN_Parent;
        SAN_Parent = map[SAN_Parent];
        SAN_Trace = [...SAN_Trace, SAN_Parent];
    }

    // console.log(SAN_Trace);

    for (let i = 0; i < YOU_Trace.length; i++)
    {
        const you_trace = YOU_Trace[i];

        for (let j = 0; j < SAN_Trace.length; j++)
        {
            const san_trace = SAN_Trace[j];

            if (you_trace === san_trace)
            {
                return j + i;
            }
        }
    }
}