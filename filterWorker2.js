// filterWorker2.js
onmessage = function (event) {
    const imageData = event.data.imageData;
    const filteredImageData = applyInverse(imageData);
    postMessage({ imageData: filteredImageData });
    close();
};

function applyInverse(imageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    return imageData;
}