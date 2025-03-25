"use client";

import ImageDisplayer from "./ImageDisplay";
import ImageUploader from "./ImageUploader";

const CombinedImageSection = () => {
    return (
        <div className="flex flex-col  p-8">
            <h2 className="text-xl font-semibold mb-4">Image Section</h2>
            <ImageUploader />

        </div>
    );
};

export default CombinedImageSection;