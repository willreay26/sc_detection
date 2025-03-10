"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useMetadataContext } from "../contexts/MetadataContext";

const MetadataInput = () => {
    const { metadata, setMetadata } = useMetadataContext();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement; // Explicit cast
        const { name, value, type } = target;
        const checked = type === "checkbox" ? (target as HTMLInputElement).checked : undefined;

        setMetadata({ [name]: type === "checkbox" ? checked : value });
    };

    return (
        <div className="flex w-full min-h-screen  p-6">
            <div className=" shadow-lg p-6 rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold text-center mb-4 ">
                    Enter Patient Metadata
                </h2>
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: "Age", name: "age", type: "number" },
                        { label: "Gender", name: "gender", type: "text" },

                        { label: "Lesion Location", name: "lesionLocation", type: "text" },

                        { label: "Lesion Duration", name: "lesionDuration", type: "text" },
                        { label: "Patient History", name: "patientHistory", type: "text" },
                        { label: "Family History", name: "familyHistory", type: "text" },

                    ].map(({ label, name, type }) => (
                        <div key={name} className="flex flex-col">
                            <label
                                htmlFor={name}
                                className="text-sm font-medium  mb-1"
                            >
                                {label}
                            </label>
                            <input
                                id={name}
                                name={name}
                                type={type}
                                value={(metadata as any)[name] || ""}
                                onChange={handleInputChange}
                                className="px-4 py-2 border  rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    ))}
                </div>
                <Button
                    className="mt-6   py-2 w-full rounded-lg  transition"
                    type="submit"
                >
                    Save Metadata
                </Button>
            </div>
        </div>
    );
};

export default MetadataInput;
