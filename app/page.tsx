import SideBar from "./Components/SideBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Section: Image and Metadata */}
      <div className="flex flex-1 flex-row h-1/2">
        {/* Image Summary */}
        <div className="flex-1 bg-button flex items-center justify-center p-4">
          <p>Image</p>
        </div>
        {/* Metadata Summary */}
        <div className="flex-1 bg-button flex items-center justify-center p-4">
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
