// filterWorker1.js
onmessage = function (event) {
    const imageData = event.data.imageData;
    const filteredImageData = applyGrayscale(imageData);
    postMessage({ imageData: filteredImageData });
    close();
};

function applyGrayscale(imageData) {
    console.log('Received imageData in worker:', imageData); // Add this line

    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = average;
        data[i + 1] = average;
        data[i + 2] = average;
    }
    return imageData;
}