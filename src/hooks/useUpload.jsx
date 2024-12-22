import { useState, useCallback } from "react";
import uploadImgToCloud from "../utils/uploadImgToCloud";

const useUpload = (initialImages = []) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadState, setUploadState] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [images, setImages] = useState(initialImages);

  const setImagesCallback = useCallback((newImages) => {
    setImages(newImages);
  }, []);

  const onChange = async (e) => {
    setIsDisabled(true);
    setIsLoading(true);
    setUploadState("Uploading...");
    setErrMsg("");
    const files = Array.from(e.target.files);

    try {
      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const imageData = e.target.result;
              const imageLink = await uploadImgToCloud(imageData);
              resolve(imageLink);
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const uploadedImages = await Promise.all(uploadPromises);

      setImages((prevImages) => [...prevImages, ...uploadedImages]);
      setIsUploaded(true);
      setIsLoading(false);
      setUploadState("Uploaded Successfully.");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setUploadState("");
      setErrMsg("Failed to upload one or more images");
      setIsUploaded(false);
    }

    setTimeout(() => {
      autoReset();
    }, 8000);
    setIsDisabled(false);
  };

  const autoReset = () => {
    setIsUploaded(true);
    setIsLoading(false);
    setUploadState("");
    setIsDisabled(false);
  };

  const resetUploadState = () => {
    setIsUploaded(false);
    setIsLoading(false);
    setUploadState("");
    setIsDisabled(false);
    setImages([]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return {
    onChange,
    images,
    setImages: setImagesCallback,
    disabled: isDisabled,
    isUploaded,
    isLoading,
    uploadState,
    errMsg,
    reset: resetUploadState,
    removeImage,
  };
};

export default useUpload;
