"use client";

import { useState } from "react";
import { useImageContext } from "../contexts/ImageContext";
import * as tf from "@tensorflow/tfjs";

import { Button } from "@/components/ui/button";

export default function ImageUpload() {
    const { setImage } = useImageContext();
    const [preview, setPreview] = useState<string | null>(null);
    const [predictionResult, setPredictionResult] = useState<{
        class: string;
        confidence: string;
    } | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file); // Save file in global state
            setPreview(URL.createObjectURL(file)); // For local preview
        }
    };

    const processImage = async (imageFile: File) => {
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

    const predict = async () => {
        if (!preview) {
            console.error("No image available for prediction.");
            return;
        }

        const imageFile = await fetch(preview)
            .then((res) => res.blob())
            .then((blob) => new File([blob], "uploaded_image.jpg"));
        const processedImage = await processImage(imageFile);

        try {
            const model = await tf.loadLayersModel("/models/model.json"); // Adjust path to your model
            const predictionTensor = model.predict(processedImage) as tf.Tensor;
            const predictionArray = Array.from(predictionTensor.dataSync());

            if (predictionArray.length > 0) {
                // Define class labels for HAM10000
                const classLabels = ["akiec", "bcc", "bkl", "df", "mel", "nv", "vasc"];
                const predictedIndex = predictionArray.indexOf(Math.max(...predictionArray));
                const predictedClass = classLabels[predictedIndex];
                const confidence = Math.max(...predictionArray) * 100;

                // Set prediction result
                setPredictionResult({
                    class: predictedClass,
                    confidence: confidence.toFixed(2),
                });
            } else {
                console.error("Prediction array is empty.");
            }
        } catch (error) {
            console.error("Error loading or using the model:", error);
        }
    };

    return (
        <div className="p-4 w-full flex-row justify-start items-start">
            <h1 className="text-xl font-bold mb-4 ">Upload an Image</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 flex flex-row "
            />
            {preview && (
                <div className="mb-4 gap-2">
                    <img src={preview} alt="Preview" className="w-32 h-32 object-cover" />
                    <Button
                        onClick={predict}
                        className="mt-4 px-4 py-2  rounded "
                    >
                        Predict
                    </Button>
                </div>
            )}
            {predictionResult && (
                <div className=" flex flex-col ">
                    <h2 className="text-lg font-bold mb-2 ">Prediction Result</h2>
                    <p className="font-light">
                        Predicted class: {predictionResult.class} <br />
                        Confidence: {predictionResult.confidence}%
                    </p>
                </div>
            )}
        </div>
    );
}
