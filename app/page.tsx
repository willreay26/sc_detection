"use client";

import CombinedImageSection from "./Components/CombinedImageSection";
import CombinedMetadataSection from "./Components/CombinedMetadataSection";
import FusionPredictor from "./Components/FusionPredictor";

export default function Home() {
  return (
    <div className="flex flex-col p-4">
      {/* Main Content Section */}
      <div className="flex flex-col w-full">
        {/* Combined Image Section */}
        {/* <CombinedImageSection /> */}

        {/* Combined Metadata Section */}
        {/* <CombinedMetadataSection /> */}
        <FusionPredictor />
      </div>
    </div>
  );
}
