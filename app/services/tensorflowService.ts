import * as tf from "@tensorflow/tfjs";

export const processImage = async (imageFile: File) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);

    // Wait for the image to load
    await new Promise((resolve) => (img.onload = resolve));

    // Convert image to tensor
    return tf.browser.fromPixels(img)
        .resizeNearestNeighbor([128, 128]) // Resize to [128, 128] to match the model
        .toFloat()
        .div(255.0) // Normalize pixel values to [0, 1]
        .expandDims(0); // Add batch dimension
};

export const predictWithModel = async (imageUrl: string) => {
    if (!imageUrl) {
        throw new Error("No image available for prediction.");
    }

    const imageFile = await fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => new File([blob], "uploaded_image.jpg"));
    const processedImage = await processImage(imageFile);

    try {
        const model = await tf.loadLayersModel("/models/model.json");
        const predictionTensor = model.predict(processedImage) as tf.Tensor;
        const predictionArray = Array.from(predictionTensor.dataSync());

        if (predictionArray.length > 0) {
            // Define class labels for HAM10000
            const classLabels = ["akiec", "bcc", "bkl", "df", "mel", "nv", "vasc"];
            const predictedIndex = predictionArray.indexOf(Math.max(...predictionArray));
            const predictedClass = classLabels[predictedIndex];
            const confidence = Math.max(...predictionArray) * 100;

            return {
                class: predictedClass,
                confidence: confidence.toFixed(2),
            };
        } else {
            throw new Error("Prediction array is empty.");
        }
    } catch (error) {
        console.error("Error loading or using the model:", error);
        throw error;
    }
};