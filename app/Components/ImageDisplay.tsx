import { useImageContext } from "../contexts/ImageContext"

const ImageDisplayer = () => {
    const { image } = useImageContext();
    return (

        <div className="flex-1 bg-primaryText  w-full  flex  justify-start">
            {image ? (
                <div className="bg-primaryText p-2 pb-4 ">
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded"
                        className="max-h-full max-w-full object-contain"
                    />
                    <h1 className="flex p-2">{image.name}</h1>
                </div>
            ) : (
                <p className="text-white text-center max-h-full max-w-full object-contain p-4">No Image Uploaded</p>
            )}
        </div>
    )
}

export default ImageDisplayer