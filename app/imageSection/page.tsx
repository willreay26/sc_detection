"use client";
import ImageDisplayer from "../Components/ImageDisplay";
import ImageUploader from "../Components/ImageUploader";

const ImageSection = () => {
    return (
        <div className="flex-1 bg-primary flex flex-col items-center justify-center p-4 h-full ">
            <ImageUploader />
            <ImageDisplayer />

        </div>
    );
}
export default ImageSection