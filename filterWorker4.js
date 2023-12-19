// filterWorker4.js
onmessage = function (event) {
    const imageData = event.data.imageData;
    const filteredImageData = applySepia(imageData);
    postMessage({ imageData: filteredImageData });
    close();
};

function applySepia(imageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const tr = 0.393 * r + 0.769 * g + 0.189 * b;
        const tg = 0.349 * r + 0.686 * g + 0.168 * b;
        const tb = 0.272 * r + 0.534 * g + 0.131 * b;

        data[i] = tr < 255 ? tr : 255;
        data[i + 1] = tg < 255 ? tg : 255;
        data[i + 2] = tb < 255 ? tb : 255;
    }
    return imageData;
}