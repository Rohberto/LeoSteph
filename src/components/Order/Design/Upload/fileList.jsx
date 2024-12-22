/* eslint-disable react/prop-types */
import { DeleteIcon, ImageIcon } from "../../../../shared/Icons/index";
import ProgressBar from "../../../../shared/Icons/progress";

const FileItem = ({ file, uploading, uploadProgress, removeFile }) => (
  <div className="flex items-center p-2 bg-gray-50 rounded">
    <div className="w-12 h-12 relative flex-shrink-0">
      {file.preview ? (
        <img
          src={file.preview}
          alt={file.name}
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <ImageIcon />
      )}
    </div>
    <div className="ml-3 flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
      <p className="text-xs text-gray-500">
        {(file.size / 1024 / 1024).toFixed(2)} MB
      </p>
      {uploadProgress[file.name] !== undefined && (
        <ProgressBar value={uploadProgress[file.name]} />
      )}
    </div>
    {!uploading && (
      <button
        onClick={() => removeFile(file)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        <DeleteIcon />
      </button>
    )}
  </div>
);

export default FileItem;
