import { useImageContext } from "../contexts/ImageContext"

import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"


const ImageDisplayer = () => {
    const { image } = useImageContext();
    return (

        <>
            {image ? (
                <div className="w-1/2 ">
                    <AspectRatio className="object-fill flex  justify-center" ratio={16 / 9}>
                        <Image src={URL.createObjectURL(image)} className="object-cover" width={450} height={300} alt="Image" />
                        {/* <h1 className="flex p-2">{image.name}</h1> */}
                    </AspectRatio>


                </div>
            ) : (
                <p className=" text-start max-h-full max-w-full object-contain p-4">No Image Uploaded</p>
            )
            }

        </>
    )
}

export default ImageDisplayer