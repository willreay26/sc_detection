"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the metadata structure
interface ImageMetadataProps {
    age: number | null; // Age of the patient
    gender: "Male" | "Female" | "Other" | null; // Gender of the patient
    ethnicity: string | null; // Patient's ethnicity or background
    lesionLocation: string | null; // Location of the lesion (e.g., "Arm", "Face", etc.)
    lesionSize: number | null; // Size of the lesion in millimeters
    lesionDuration: string | null; // Duration the lesion has been present (e.g., "2 weeks", "6 months")
    patientHistory: string | null; // Any relevant medical history
    familyHistory: string | null; // Family history of skin cancer or related conditions
    UVExposure: "Low" | "Moderate" | "High" | null; // Patient's exposure to UV radiation
    isSmoking: boolean; // Smoking habits
    imageID: string | null; // Unique identifier for the image
    diagnosis: string | null; // If known, the diagnosis for the image
}

// Define the context type
interface MetadataContextProps {
    metadata: ImageMetadataProps;
    setMetadata: (metadata: Partial<ImageMetadataProps>) => void; // Function to update metadata
}

// Create the Metadata Context
const MetadataContext = createContext<MetadataContextProps | undefined>(undefined);

// MetadataProvider component
export const MetadataProvider = ({ children }: { children: ReactNode }) => {
    // Define the state for metadata
    const [metadata, setMetadataState] = useState<ImageMetadataProps>({
        age: null,
        gender: null,
        ethnicity: null,
        lesionLocation: null,
        lesionSize: null,
        lesionDuration: null,
        patientHistory: null,
        familyHistory: null,
        UVExposure: null,
        isSmoking: false,
        imageID: null,
        diagnosis: null,
    });

    // Function to update metadata
    const setMetadata = (newMetadata: Partial<ImageMetadataProps>) => {
        setMetadataState((prevMetadata) => ({
            ...prevMetadata,
            ...newMetadata,
        }));
    };

    return (
        <MetadataContext.Provider value={{ metadata, setMetadata }}>
            {children}
        </MetadataContext.Provider>
    );
};

// Hook to use MetadataContext
export const useMetadata = (): MetadataContextProps => {
    const context = useContext(MetadataContext);
    if (!context) {
        throw new Error("useMetadata must be used within a MetadataProvider");
    }
    return context;
};
