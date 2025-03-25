"use client";

import MetadataInput from "./metadataInput";
import MetadataDisplay from "./MetadataDisplay";

const CombinedMetadataSection = () => {
    return (
        <div className="flex flex-col  p-8">
            <h2 className="text-xl font-semibold mb-2">Metadata Section</h2>
            <MetadataInput />

            <MetadataDisplay />

        </div >
    );
};

export default CombinedMetadataSection;