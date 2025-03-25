import { useMetadataContext } from "../contexts/MetadataContext";

const MetadataDisplay = () => {
    const { metadata } = useMetadataContext();

    return (
        <div className="flex flex-col w-full mt-6">
            <h3 className="text-lg font-medium mb-3">Metadata Summary</h3>

            <div className="bg-card rounded-lg p-4 border border-border">
                {Object.keys(metadata).some(key => metadata[key as keyof typeof metadata]) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "Age", value: metadata.age || "N/A" },
                            { label: "Gender", value: metadata.gender || "N/A" },
                            { label: "Lesion Location", value: metadata.lesionLocation || "N/A" },
                            { label: "Lesion Duration", value: metadata.lesionDuration || "N/A" },
                            { label: "Patient History", value: metadata.patientHistory || "N/A" },
                            { label: "Family History", value: metadata.familyHistory || "N/A" },
                            { label: "Diagnosis", value: metadata.diagnosis || "N/A" },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex flex-col p-2 hover:bg-muted rounded-md transition-colors">
                                <span className="text-sm font-medium text-foreground">
                                    {label}
                                </span>
                                <span className="font-semibold text-primary">{value}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-32 text-muted-foreground">
                        <p>No metadata available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetadataDisplay;