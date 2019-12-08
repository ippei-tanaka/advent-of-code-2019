export default (pictureStr, width, height) =>
{
    const picture = pictureStr.trim().split('').map(s => Number.parseInt(s));
    const area = width * height;

    let layers = [];
    let layerIndex = 0;
    loop: while (true)
    {
        const layer = [];
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
                layer.push(digit);
                // layer[digit] = layer[digit] || 0;
                // layer[digit] = layer[digit] + 1;
            }
        }

        layerIndex = layerIndex + 1;
    }

    layers = layers.filter(l => Object.keys(l).length);
    const layerSize = layers.length;
    let finalImage = [];
    for (let y = 0; y < height; y++)
    {
        for (let x = 0; x < width; x++)
        {
            const index = (width * y) + x;

            for (let l = 0; l < layerSize; l++)
            {
                const digit = layers[l][index];
                if (digit !== 2)
                {
                    finalImage[index] = digit;
                    break;
                }
            }
        }
    }

    let message = '--- message start ---\n';
    for (let y = 0; y < height; y++)
    {
        message = message + finalImage.slice(width * y, width * (y + 1)).map(i => i || " ").join("") + '\n';
    }
    message = message + '--- message end ---';
    console.log(message);

    return finalImage.join("");
};
