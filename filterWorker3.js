// filterWorker3.js
onmessage = function (event) {
    const imageData = event.data.imageData;
    const filteredImageData = applyBlur(imageData);
    postMessage({ imageData: filteredImageData });
    close();
};

function applyBlur(imageData) {
    const radius = 2;
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;

            for (let offsetY = -radius; offsetY <= radius; offsetY++) {
                for (let offsetX = -radius; offsetX <= radius; offsetX++) {
                    const pixelIndex = ((y + offsetY) * width + (x + offsetX)) * 4;
                    const weight = 1 / (2 * radius + 1) ** 2;

                    r += data[pixelIndex] * weight;
                    g += data[pixelIndex + 1] * weight;
                    b += data[pixelIndex + 2] * weight;
                }
            }

            const pixelIndex = (y * width + x) * 4;
            data[pixelIndex] = r;
            data[pixelIndex + 1] = g;
            data[pixelIndex + 2] = b;
        }
    }

    return imageData;
}