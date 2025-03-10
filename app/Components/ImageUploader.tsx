"use client";

import { useState } from "react";
import { useImageContext } from "../contexts/ImageContext";
import { predictWithModel } from "../services/tensorflowService";

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

    const predict = async () => {
        if (!preview) {
            console.error("No image available for prediction.");
            return;
        }

        try {
            const result = await predictWithModel(preview);
            setPredictionResult(result);
        } catch (error) {
            console.error("Error during prediction:", error);
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
