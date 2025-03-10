import { useMetadataContext } from "../contexts/MetadataContext";

const MetadataDisplay = () => {
    const { metadata } = useMetadataContext();
    return (
        <div className="flex-1  flex flex-col w-1/2 p-4 ">
            <h2 className="text-xl font-semibold mb-4  ">
                Metadata Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { label: "Age", value: metadata.age || "N/A" },
                    { label: "Gender", value: metadata.gender || "N/A" },

                    { label: "Lesion Location", value: metadata.lesionLocation || "N/A" },

                    { label: "Family History", value: metadata.familyHistory || "N/A" },

                    { label: "Diagnosis", value: metadata.diagnosis || "N/A" },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col">
                        <span className="text-sm font-medium ">
                            {label}:
                        </span>
                        <span className=" ">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MetadataDisplay;