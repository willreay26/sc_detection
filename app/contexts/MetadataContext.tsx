"use client"

import { createContext, useContext, ReactNode, useState } from "react";

// Export the interface so it can be imported in other files
export interface ImageMetadataProps {
    age?: string;
    gender?: string;
    lesionLocation?: string;
    lesionDuration?: string;
    patientHistory?: string;
    familyHistory?: string;
    diagnosis?: string;
    [key: string]: string | boolean | undefined;
}

interface MetadataContextType {
    metadata: ImageMetadataProps;
    setMetadata: (newMetadata: Partial<ImageMetadataProps>) => void;
}

const MetadataContext = createContext<MetadataContextType | undefined>(undefined);

export const useMetadataContext = () => {
    const context = useContext(MetadataContext);
    if (!context) {
        throw new Error("useMetadataContext must be used within a MetadataProvider");
    }
    return context;
};

export const MetadataProvider = ({ children }: { children: ReactNode }) => {
    const [metadata, setMetadataState] = useState<ImageMetadataProps>({});

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
