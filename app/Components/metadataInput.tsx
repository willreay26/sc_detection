"use client";

import React, { useState } from "react";
import { Button } from "@/app/Components/button";
import { useMetadataContext } from "../contexts/MetadataContext";
import { predictMetadataWithAPI } from "../services/apiService";

const MetadataInput = () => {
    const { metadata, setMetadata } = useMetadataContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const [predictionResult, setPredictionResult] = useState<{ prediction: number; class: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        const checked = type === "checkbox" ? (target as HTMLInputElement).checked : undefined;

        setMetadata({ [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate that we have enough metadata
        if (!metadata.age || !metadata.gender || !metadata.lesionLocation) {
            alert("Please provide at least age, gender, and lesion location information");
            return;
        }

        setIsLoading(true);
        try {
            // Call the API service to get prediction
            const result = await predictMetadataWithAPI(metadata);
            setPredictionResult(result);

            // Update the diagnosis field with the prediction result
            setMetadata({
                diagnosis: result.class
            });
        } catch (error) {
            console.error("Error predicting with metadata:", error);
            alert("Failed to get prediction. Please try again.");
        } finally {
            setIsLoading(false);
            setIsExpanded(false);
        }
    };

    return (
        <div className="w-full mt-4">
            <h3 className="text-lg font-medium mb-3 ">Patient Metadata</h3>

            {!isExpanded ? (
                <div
                    onClick={() => setIsExpanded(true)}
                    className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors bg-card"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-muted-foreground mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm text-foreground">Click to enter patient metadata</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-card shadow-md rounded-lg p-5 border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "Age", name: "age", type: "number", placeholder: "Enter patient age" },
                            {
                                label: "Gender",
                                name: "gender",
                                type: "select",
                                options: ["Male", "Female", "Other"]
                            },
                            { label: "Lesion Location", name: "lesionLocation", type: "text", placeholder: "e.g., Arm, Face, Back" },
                            { label: "Lesion Duration", name: "lesionDuration", type: "text", placeholder: "e.g., 2 weeks, 6 months" },
                            { label: "Patient History", name: "patientHistory", type: "text", placeholder: "Relevant medical history" },
                            { label: "Family History", name: "familyHistory", type: "text", placeholder: "Family history of skin conditions" },
                        ].map(({ label, name, type, placeholder, options }) => (
                            <div key={name} className="flex flex-col">
                                <label
                                    htmlFor={name}
                                    className="text-sm font-medium mb-1 text-foreground"
                                >
                                    {label}
                                </label>
                                {type === "select" ? (
                                    <select
                                        id={name}
                                        name={name}
                                        value={(metadata as any)[name] || ""}
                                        onChange={handleInputChange}
                                        className="px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all bg-background text-foreground"
                                    >
                                        <option value="">Select {label}</option>
                                        {options?.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={name}
                                        name={name}
                                        type={type}
                                        placeholder={placeholder}
                                        value={(metadata as any)[name] || ""}
                                        onChange={handleInputChange}
                                        className="px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all bg-background text-foreground"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-6 space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                        >
                            Cancel
                        </button>
                        <Button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Save Metadata"}
                        </Button>
                    </div>
                </form>
            )}

            {predictionResult && (
                <div className="mt-6 p-4 bg-card rounded-lg border border-border">
                    <h2 className="text-lg font-bold mb-2 ">Metadata Prediction Result</h2>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-foreground">Predicted Class:</span>
                            <span className="font-semibold text-primary">{predictionResult.class}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                            Based on patient metadata: age, gender, and lesion location
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MetadataInput;
