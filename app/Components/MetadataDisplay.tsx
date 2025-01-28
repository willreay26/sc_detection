import { useMetadataContext } from "../contexts/MetadataContext";

const MetadataDisplay = () => {
    const { metadata } = useMetadataContext();
    return (
        <div className="flex-1 bg-gray-100 flex flex-col justify-center p-4 ">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Metadata Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { label: "Age", value: metadata.age || "N/A" },
                    { label: "Gender", value: metadata.gender || "N/A" },
                    { label: "Ethnicity", value: metadata.ethnicity || "N/A" },
                    { label: "Lesion Location", value: metadata.lesionLocation || "N/A" },
                    { label: "Lesion Size", value: metadata.lesionSize || "N/A" },
                    { label: "Lesion Duration", value: metadata.lesionDuration || "N/A" },
                    { label: "Family History", value: metadata.familyHistory || "N/A" },
                    { label: "UV Exposure", value: metadata.UVExposure || "N/A" },
                    { label: "Smoking", value: metadata.isSmoking ? "Yes" : "No" },
                    { label: "Image ID", value: metadata.imageID || "N/A" },
                    { label: "Diagnosis", value: metadata.diagnosis || "N/A" },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">
                            {label}:
                        </span>
                        <span className="text-lg text-gray-800">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MetadataDisplay;