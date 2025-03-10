"use client";

import ImageDisplay from "./Components/ImageDisplay";
import MetadataDisplay from "./Components/MetadataDisplay";

export default function Home() {

  return (
    <div className="flex-row  ">
      {/* Top Section: Image and Metadata */}
      <div className="flex flex-row w-full  ">
        {/* Image Section */}
        <ImageDisplay />
        {/* Metadata Section */}
        <MetadataDisplay />
      </div>
      {/* Bottom Section: Prediction Summary */}
      <div className="flex p-2 items-center justify-center ">
        <h2 className="text-xl font-semibold my-16">Prediction Summary</h2>
      </div>
    </div>
  );
}
