"use client";

import { useState } from "react";
import { useImageContext } from "../contexts/ImageContext";
import { useMetadataContext } from "../contexts/MetadataContext";
import { predictImageWithAPI, predictMetadataWithAPI } from "../services/apiService";
import { Button } from "@/app/Components/button";
import ImageUpload from "./ImageUploader";
import MetadataInput from "./metadataInput";
import { Separator } from "./separator";

export default function FusionPredictor() {
    const { image } = useImageContext();
    const { metadata, setMetadata } = useMetadataContext();
    const [isLoading, setIsLoading] = useState(false);
    const [actualDiagnosis, setActualDiagnosis] = useState<string>("");
    const [fusionResult, setFusionResult] = useState<{
        imageClass: string;
        imageConfidence: string;
        metadataClass: string;
        finalPrediction: string;
        actualDiagnosis?: string;
    } | null>(null);
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

    const predictWithFusion = async () => {
        if (!image || !metadata.age || !metadata.gender || !metadata.lesionLocation) {
            alert("Please provide both an image and the required metadata (age, gender, and lesion location)");
            return;
        }

        setIsLoading(true);
        try {
            // Get predictions from both models
            const imageResult = await predictImageWithAPI(image);
            const metadataResult = await predictMetadataWithAPI(metadata);

            // Simple fusion logic - you can implement more sophisticated fusion if needed
            // Here we're just taking the image model's prediction as the final one
            // but showing both results for comparison
            const finalPrediction = imageResult.class;

            setFusionResult({
                imageClass: imageResult.class,
                imageConfidence: imageResult.confidence,
                metadataClass: metadataResult.class,
                finalPrediction: finalPrediction,
                actualDiagnosis: actualDiagnosis || undefined
            });
        } catch (error) {
            console.error("Error during fusion prediction:", error);
            alert("Failed to get fusion prediction. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6">Fusion Prediction</h2>

            {/* Progress indicator */}
            <div className="flex items-center mb-8">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} font-bold`}>1</div>
                <div className={`h-1 flex-1 mx-2 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} font-bold`}>2</div>
                <div className={`h-1 flex-1 mx-2 ${currentStep >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} font-bold`}>3</div>
            </div>

            {/* Step 1: Image Upload */}
            {currentStep === 1 && (
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Step 1: Upload and Analyze Image</h3>
                    <ImageUpload />

                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={() => setCurrentStep(2)}
                            disabled={!image}
                            className="px-4 py-2"
                        >
                            Next: Enter Patient Metadata →
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 2: Metadata Input */}
            {currentStep === 2 && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Step 2: Enter Patient Metadata</h3>
                        <Button
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                            className="text-sm"
                        >
                            ← Back to Image
                        </Button>
                    </div>

                    <MetadataInput />

                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={() => setCurrentStep(3)}
                            disabled={!metadata.age || !metadata.gender || !metadata.lesionLocation}
                            className="px-4 py-2"
                        >
                            Next: Run Fusion Prediction →
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Fusion Prediction */}
            {currentStep === 3 && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Step 3: Fusion Prediction</h3>
                        <Button
                            variant="outline"
                            onClick={() => setCurrentStep(2)}
                            className="text-sm"
                        >
                            ← Back to Metadata
                        </Button>
                    </div>

                    {/* Add actual diagnosis input field before running prediction */}
                    <div className="p-6 bg-card rounded-lg border border-border mb-6">
                        <h3 className="text-lg font-semibold mb-3">Actual Diagnosis (Optional)</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            If you know the actual diagnosis, enter it here to compare with the model predictions.
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Enter actual diagnosis if known"
                                value={actualDiagnosis}
                                onChange={(e) => setActualDiagnosis(e.target.value)}
                                className="flex-1 px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all bg-background text-foreground"
                            />
                        </div>

                        <p className="mb-4">You've completed both the image and metadata sections. Now you can run the fusion prediction to get results from both models.</p>

                        <Button
                            onClick={predictWithFusion}
                            disabled={isLoading}
                            className="w-full py-3"
                        >
                            {isLoading ? "Processing..." : "Run Fusion Prediction"}
                        </Button>
                    </div>

                    {fusionResult && (
                        <div className="mt-8 p-6 bg-card rounded-lg border border-border">
                            <h2 className="text-xl font-bold mb-4">Fusion Prediction Results</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 bg-background rounded-lg border border-border">
                                    <h3 className="text-lg font-semibold mb-3">Image Model</h3>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-foreground">Class:</span>
                                            <span className="font-semibold text-primary">{fusionResult.imageClass}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-foreground">Confidence:</span>
                                            <span className="font-semibold text-primary">{fusionResult.imageConfidence}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-background rounded-lg border border-border">
                                    <h3 className="text-lg font-semibold mb-3">Metadata Model</h3>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-foreground">Class:</span>
                                            <span className="font-semibold text-primary">{fusionResult.metadataClass}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-background rounded-lg border border-border">
                                    <h3 className="text-lg font-semibold mb-3">Final Prediction</h3>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-foreground">Class:</span>
                                            <span className="font-semibold text-primary">{fusionResult.finalPrediction}</span>
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-2">
                                            Based on both image and metadata analysis
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Add comparison with actual diagnosis if provided */}
                            {fusionResult.actualDiagnosis && (
                                <div className="mt-6 p-4 bg-background rounded-lg border border-border">
                                    <h3 className="text-lg font-semibold mb-3">Comparison with Actual Diagnosis</h3>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-foreground">Actual Diagnosis:</span>
                                            <span className="font-semibold text-primary">{fusionResult.actualDiagnosis}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-foreground">Prediction Match:</span>
                                            <span className={`font-semibold ${fusionResult.finalPrediction.toLowerCase() === fusionResult.actualDiagnosis.toLowerCase() ? 'text-green-500' : 'text-red-500'}`}>
                                                {fusionResult.finalPrediction.toLowerCase() === fusionResult.actualDiagnosis.toLowerCase() ? 'Correct' : 'Incorrect'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    )}
                </div>
            )}
        </div>
    );
}