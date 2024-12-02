"use client";
import { useImageContext } from "./contexts/ImageContext";


export default function Home() {

  const { image } = useImageContext();
  return (
    <div className="flex flex-col h-screen">
      {/* Top Section: Image and Metadata */}
      <div className="h-1/2 flex-row flex ">
        {/* Image Summary */}
        <div className="flex-1 bg-black flex items-center justify-center p-4 w-1/2">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <p className="text-white">No Image Uploaded</p>
          )}
        </div>
        {/* Metadata Summary */}
        <div className="flex-1 bg-button flex items-center justify-center p-4 w-1/2">
          <p>Metadata</p>
        </div>
      </div>
      {/* Bottom Section: Prediction Summary */}
      <div className="flex h-1/2 bg-button items-center justify-center p-4">
        <p>Prediction</p>
      </div>

    </div>
  );
}
