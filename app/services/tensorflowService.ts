import * as tf from "@tensorflow/tfjs";
import { predictImageWithAPI } from "./apiService";

// This function is kept for potential future use or reference
export const processImage = async (imageFile: File) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);

    // Wait for the image to load
    await new Promise((resolve) => (img.onload = resolve));

    // Convert image to tensor
    return tf.browser.fromPixels(img)
        .resizeNearestNeighbor([128, 128]) 
        .toFloat()
        .div(255.0) 
        .expandDims(0); 
};

// Redirects to API prediction instead of using local model
export const predictWithModel = async (imageUrl: string) => {
    if (!imageUrl) {
        throw new Error("No image available for prediction.");
    }

    try {
        // Convert the image URL to a File object
        const imageFile = await fetch(imageUrl)
            .then((res) => res.blob())
            .then((blob) => new File([blob], "uploaded_image.jpg"));
        
        // Use the API service instead of local model
        return await predictImageWithAPI(imageFile);
    } catch (error) {
        console.error("Error predicting with API:", error);
        throw error;
    }
};

// Also redirects to API prediction
export const predictWithResNet50 = async (imageUrl: string) => {
    // Simply redirect to the same function as above to use the API
    return predictWithModel(imageUrl);
};