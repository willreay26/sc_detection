"use client";

import React from "react";
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
        <div className="flex w-full h-full bg-gray-50 text-gray-800 p-6">
            <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
                    Enter Patient Metadata
                </h2>
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: "Age", name: "age", type: "number" },
                        { label: "Gender", name: "gender", type: "text" },
                        { label: "Ethnicity", name: "ethnicity", type: "text" },
                        { label: "Lesion Location", name: "lesionLocation", type: "text" },
                        { label: "Lesion Size (mm)", name: "lesionSize", type: "number" },
                        { label: "Lesion Duration", name: "lesionDuration", type: "text" },
                        { label: "Patient History", name: "patientHistory", type: "text" },
                        { label: "Family History", name: "familyHistory", type: "text" },
                        { label: "UV Exposure", name: "UVExposure", type: "text" },
                    ].map(({ label, name, type }) => (
                        <div key={name} className="flex flex-col">
                            <label
                                htmlFor={name}
                                className="text-sm font-medium text-gray-600 mb-1"
                            >
                                {label}
                            </label>
                            <input
                                id={name}
                                name={name}
                                type={type}
                                value={(metadata as any)[name] || ""}
                                onChange={handleInputChange}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="mt-6 bg-blue-500 text-white py-2 w-full rounded-lg hover:bg-blue-600 transition"
                    type="submit"
                >
                    Save Metadata
                </button>
            </div>
        </div>
    );
};

export default MetadataInput;
