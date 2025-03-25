"use client";

import { useState, useRef } from "react";
import { useImageContext } from "../contexts/ImageContext";
import { predictImageWithAPI, verifyPredictionWithAPI } from "../services/apiService";
import { Button } from "@/app/Components/button";

export default function ImageUpload() {
    const { image, setImage } = useImageContext();
    const [preview, setPreview] = useState<string | null>(null);
    const [predictionResult, setPredictionResult] = useState<{
        class: string;
        confidence: string;
        actual_diagnosis?: string;
        is_correct?: boolean;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modelType, setModelType] = useState<"custom" | "resnet50">("custom");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [actualDiagnosis, setActualDiagnosis] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file); // Save file in global state
            setPreview(URL.createObjectURL(file)); // For local preview
            setPredictionResult(null); // Reset prediction when new image is uploaded
        }
    };

    const handleAreaClick = () => {
        // Trigger the hidden file input when the area is clicked
        fileInputRef.current?.click();
    };

    const predict = async () => {
        if (!preview || !image) {
            console.error("No image available for prediction.");
            return;
        }

        setIsLoading(true);
        try {
            let result;
            // If actual diagnosis is provided, use verification
            if (actualDiagnosis.trim()) {
                result = await verifyPredictionWithAPI(image, actualDiagnosis);
            } else {
                // Otherwise just get the prediction
                result = await predictImageWithAPI(image);
            }
            setPredictionResult(result);
        } catch (error) {
            console.error("Error during prediction:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <h3 className="text-lg font-medium mb-3">Upload an Image</h3>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {!preview ? (
                <div
                    onClick={handleAreaClick}
                    className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors h-64 bg-card"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-foreground">Click to upload an image</p>
                    <p className="text-xs text-muted-foreground mt-1">or drag and drop</p>
                </div>
            ) : (
                <div className="flex flex-row space-x-6">
                    {/* Left side - Image and controls */}
                    <div className="flex-1 flex flex-col">
                        <div className="relative">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-64 object-contain rounded-lg border border-border"
                            />
                            <button
                                onClick={() => {
                                    setPreview(null);
                                    setImage(null);
                                    setPredictionResult(null);
                                }}
                                className="absolute top-2 right-2 bg-background rounded-full p-1 shadow-md hover:bg-muted"
                                title="Remove image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Actual diagnosis input */}
                        <div className="mt-4 mb-4">
                            <label className="block text-sm font-medium mb-1 text-foreground">
                                Actual Diagnosis (optional)
                            </label>
                            <input
                                type="text"
                                value={actualDiagnosis}
                                onChange={(e) => setActualDiagnosis(e.target.value)}
                                className="w-full p-2 border border-border rounded-lg bg-card text-foreground"
                                placeholder="Enter known diagnosis if available"
                            />
                        </div>

                        <div className="mt-2 flex items-center justify-end">
                            <Button
                                onClick={predict}
                                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Predict"}
                            </Button>
                        </div>
                    </div>

                    {/* Right side - Prediction results */}
                    <div className="flex-1 flex flex-col">
                        {predictionResult ? (
                            <div className="h-full p-4 bg-card rounded-lg border border-border flex flex-col">
                                <h2 className="text-lg font-bold mb-4">Prediction Result</h2>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-foreground">Class:</span>
                                        <span className="font-semibold text-primary">{predictionResult.class}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-foreground">Confidence:</span>
                                        <span className="font-semibold text-primary">{predictionResult.confidence}%</span>
                                    </div>

                                    {/* Display verification result if actual diagnosis was provided */}
                                    {predictionResult.actual_diagnosis && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-foreground">Actual Diagnosis:</span>
                                                <span className="font-semibold">{predictionResult.actual_diagnosis}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-foreground">Result:</span>
                                                <span className={predictionResult.is_correct ? "font-semibold text-green-600" : "font-semibold text-red-600"}>
                                                    {predictionResult.is_correct ? "✓ Correct" : "✗ Incorrect"}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    <div className="text-sm text-muted-foreground mt-auto pt-4">
                                        Model used: ResNet50 API
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full p-4 bg-card rounded-lg border border-border flex flex-col items-center justify-center text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-sm">Prediction results will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}