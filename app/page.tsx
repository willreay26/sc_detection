"use client";

import { useImageContext } from "./contexts/ImageContext";
import { useMetadataContext } from "./contexts/MetadataContext";

export default function Home() {
  const { image } = useImageContext();
  const { metadata } = useMetadataContext();

  return (
    <div className="flex flex-col h-screen ">
      {/* Top Section: Image and Metadata */}
      <div className="flex flex-col md:flex-row h-1/2 ">
        {/* Image Section */}
        <div className="flex-1 bg-black flex items-center justify-center p-4">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <p className="text-white text-center">No Image Uploaded</p>
          )}
        </div>

        {/* Metadata Section */}
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
      </div>

      {/* Bottom Section: Prediction Summary */}
      <div className="flex h-1/2 bg-gray-200 items-center justify-center p-4">
        <h2 className="text-xl font-semibold text-gray-700">Prediction Summary</h2>
      </div>
    </div>
  );
}
