import { useEffect, useState, useCallback } from "react";
import { defaultProductImg } from "../../const";
import useUpload from "../../hooks/useUpload";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";

const ProductImg = ({ getImages, initial = [] }) => {
  const {
    disabled,
    onChange,
    images,
    isLoading,
    errMsg,
    uploadState,
    removeImage,
    setImages,
  } = useUpload(initial);

  const [hasCustomImages, setHasCustomImages] = useState(initial.length > 0);

  useEffect(() => {
    if (
      initial.length > 0 &&
      JSON.stringify(initial) !== JSON.stringify(images)
    ) {
      setImages(initial);
      setHasCustomImages(true);
    }
  }, [images, initial, setImages]);

  const updateParentImages = useCallback(() => {
    if (images.length === 0) {
      setHasCustomImages(false);
      getImages([defaultProductImg]);
    } else {
      const filteredImages = images.filter((img) => img !== defaultProductImg);
      getImages(filteredImages);
    }
  }, [images, getImages]);

  useEffect(() => {
    updateParentImages();
  }, [updateParentImages]);

  const handleImageChange = (e) => {
    onChange(e);
    setHasCustomImages(true);
  };

  const handleRemoveImage = (index) => {
    removeImage(index);
    if (images.length === 1) {
      setHasCustomImages(false);
    }
  };

  const displayImages = hasCustomImages
    ? images.filter((img) => img !== defaultProductImg)
    : images;

  return (
    <div className="font-bold mb-2 w-full mt-3">
      <div className="cursor-pointer">Product Images</div>

      <div className="border-[1px] border-gray-700 rounded-md p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {displayImages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-36 w-full bg-gray-100 border rounded-md">
              <div className="flex flex-col items-center justify-center h-full w-full">
                <img
                  src={defaultProductImg}
                  alt="default"
                  className="h-24 w-24 object-cover opacity-50"
                />
                <p className="text-gray-500 text-sm mt-2">No Image Uploaded</p>
              </div>
            </div>
          )}
          {displayImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`product-${index}`}
                className="h-36 w-full object-cover rounded-md"
              />
              {(hasCustomImages || displayImages.length > 1) && (
                <div
                  onClick={() => handleRemoveImage(index)}
                  className="absolute right-2 top-2 text-rose-600 cursor-pointer"
                >
                  <Icon icon="line-md:remove" width={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="py-2 w-full mt-3">
        <div className="w-full my-2 flex items-center gap-x-3 justify-center">
          <div className="text-teal-500 text-base text-center">
            {errMsg || uploadState}
          </div>
          <div className="text-teal-500">
            {isLoading && <Icon icon="eos-icons:loading" width={24} />}
          </div>
        </div>
        <div className="w-full flex flex-row gap-x-3 items-center justify-center">
          <label
            htmlFor="product-image"
            className="rounded-md flex flex-row items-center gap-x-3 py-1 px-4 cursor-pointer border-[1px] bg-cyan-500 text-white active:bg-cyan-700"
          >
            Upload Product Image <IoCloudUploadOutline size={"2em"} />
          </label>
        </div>
        <input
          disabled={disabled}
          onChange={handleImageChange}
          type="file"
          accept="image/*"
          id="product-image"
          className="hidden"
          multiple
        />
      </div>
    </div>
  );
};

ProductImg.propTypes = {
  getImages: PropTypes.func.isRequired,
  initial: PropTypes.arrayOf(PropTypes.string),
};

export default ProductImg;
