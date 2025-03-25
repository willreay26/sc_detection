import { useImageContext } from "../contexts/ImageContext";
import Image from "next/image";
import { AspectRatio } from "@/app/Components/aspect-ratio";

const ImageDisplayer = () => {
    const { image } = useImageContext();
    return (
        <div className="w-full">
            <h3 className="text-lg font-medium mb-3">Image Preview</h3>
            {image ? (
                <AspectRatio className="object-fill flex justify-center" ratio={16 / 9}>
                    <Image
                        src={URL.createObjectURL(image)}
                        className="object-cover rounded-lg"
                        width={450}
                        height={300}
                        alt="Image"
                    />
                </AspectRatio>
            ) : (
                <p className="text-start p-4 border rounded-lg">No Image Uploaded</p>
            )}
        </div>
    );
};

export default ImageDisplayer;