/* eslint-disable react/prop-types */

import { UploadIcon } from "../../../../shared/Icons/index";

const FileUploadArea = ({
  isDragging,
  uploading,
  handleDragIn,
  handleDragOut,
  handleDrag,
  handleDrop,
  handleFileInput,
}) => (
  <div
    className={`border-2 border-dashed ${
      isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
    } p-6 text-center relative ${
      uploading ? "pointer-events-none opacity-50" : ""
    }`}
    onDragEnter={handleDragIn}
    onDragLeave={handleDragOut}
    onDragOver={handleDrag}
    onDrop={handleDrop}
  >
    <input
      type="file"
      className="hidden"
      id="fileInput"
      onChange={handleFileInput}
      multiple
      accept="image/*"
      disabled={uploading}
    />
    <label htmlFor="fileInput" className="w-full h-full cursor-pointer">
      <UploadIcon />
      <p className="mt-1">Drag and drop images</p>
      <p className="text-sm text-gray-500">
        or <span className="text-blue-500">click here</span> to select files
      </p>
      <p className="text-xs text-gray-400 mt-2">
        Supported formats: JPG, PNG, GIF, WebP (max 5MB)
      </p>
    </label>
  </div>
);

export default FileUploadArea;
