export default (pictureStr, width, height) =>
{
    const picture = pictureStr.trim().split('').map(s => Number.parseInt(s));
    const area = width * height;

    let layers = [];
    let layerIndex = 0;
    loop: while (true)
    {
        const layer = {};
        layers = [...layers, layer];

        for (let y = 0; y < height; y++)
        {
            for (let x = 0; x < width; x++)
            {
                const index = (width * y) + x + (area * layerIndex);

                if (picture.length <= index)
                {
                    break loop;
                }

                const digit = picture[index];
                layer[digit] = layer[digit] || 0;
                layer[digit] = layer[digit] + 1;
            }
        }

        layerIndex = layerIndex + 1;
    }

    layers = layers.filter(l => Object.keys(l).length);

    layers.sort((a, b) => (a[0] || 0) - (b[0] || 0));

    const targetLayer = layers[0];

    return targetLayer[1] * targetLayer[2];
};
