"use client";

import { useState } from "react";
import { useImageContext } from "../contexts/ImageContext";

export default function ImageUpload() {
    const { setImage } = useImageContext();
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file); // Save file in global state
            setPreview(URL.createObjectURL(file)); // For local preview
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4 text-primaryText">Upload an Image</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 text-primaryText"
            />
            {preview && (
                <div className="mb-4">
                    <img src={preview} alt="Preview" className="w-32 h-32 object-cover " />
                </div>
            )}
        </div>
    );
}
