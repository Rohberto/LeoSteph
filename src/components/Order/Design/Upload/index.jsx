/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { CloseIcon } from "../../../../shared/Icons/index";
import FileItem from "./fileList";
import FileUploadArea from "./fileUpload";
import Alert from "../../../../shared/Icons/alert";
import uploadImgToCloud from "../../../../utils/uploadImgToCloud";
import notify from "../../../../utils/notify";
import { useNavigate } from "react-router-dom";

const UploadModal = ({ onClose, setProductDesign, orderSummary }) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      return false;
    }
    return true;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFiles = useCallback((newFiles) => {
    const validFiles = Array.from(newFiles).filter((file) => {
      if (!validateFile(file)) {
        setError("Please upload images (JPG, PNG, GIF, WebP) under 5MB");
        return false;
      }
      return true;
    });

    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      validFiles.forEach((file) => {
        if (!updatedFiles.some((f) => f.name === file.name)) {
          file.preview = URL.createObjectURL(file);
          updatedFiles.push(file);
        }
      });
      return updatedFiles;
    });
    setError("");
  });

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const droppedFiles = e.dataTransfer.files;
      handleFiles(droppedFiles);
    },
    [handleFiles]
  );

  const handleFileInput = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const removeFile = (fileToRemove) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== fileToRemove);
      URL.revokeObjectURL(fileToRemove.preview);
      return updatedFiles;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one image");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploadedFiles = await Promise.all(
        files.map((file) => uploadImgToCloud(file))
      );

      setProductDesign(uploadedFiles);

      files.forEach((file) => URL.revokeObjectURL(file.preview));
      notify.success("Files updated successfully!");
      // Wait for state to update and then call handleAddToCart
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      // addToCart();
    } catch (err) {
      console.log(err);
      setError("Failed to upload files. Please try again.");
    } finally {
      setUploading(false);
      setUploadComplete(true);
      setUploadProgress({});
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {uploadComplete ? "Uploaded design" : "Upload your design"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={uploading}
          >
            <CloseIcon />
          </button>
        </div>

        {files.length === 0 && (
          <FileUploadArea
            isDragging={isDragging}
            uploading={uploading}
            handleDragIn={handleDragIn}
            handleDragOut={handleDragOut}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            handleFileInput={handleFileInput}
          />
        )}

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <FileItem
                key={index}
                file={file}
                uploading={uploading}
                uploadProgress={uploadProgress}
                removeFile={removeFile}
              />
            ))}
          </div>
        )}

        {error && <Alert>{error}</Alert>}

        <button
          className={`mt-4 w-full px-4 py-2 rounded flex items-center justify-center ${
            uploading
              ? "bg-oliveGreen cursor-not-allowed"
              : "bg-sageGreen hover:bg-forestGreen"
          } text-white`}
          onClick={uploadComplete ? () => navigate("/checkout", {
            state: {
             orderSummary
            },
          }) : handleUpload}
          disabled={uploading || files.length === 0}
        >
          {uploadComplete
            ? "Proceed to cart"
            : uploading
            ? "Uploading..."
            : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
