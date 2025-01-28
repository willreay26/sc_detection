"use client";

import ImageDisplay from "./Components/ImageDisplay";
import MetadataDisplay from "./Components/MetadataDisplay";

export default function Home() {

  return (
    <div className="flex flex-col max-h-screen gap-4 ">
      {/* Top Section: Image and Metadata */}
      <div className="flex flex-col md:flex-row  ">
        {/* Image Section */}
        <ImageDisplay />
        {/* Metadata Section */}
        <MetadataDisplay />
      </div>
      {/* Bottom Section: Prediction Summary */}
      <div className="flex h-1/2 bg-primary p-2 items-center justify-center ">
        <h2 className="text-xl font-semibold text-gray-700">Prediction Summary</h2>
      </div>
    </div>
  );
}
