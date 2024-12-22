/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineUpload,
  AiOutlineClose,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import uploadImgToCloud from "../../utils/uploadImgToCloud";

const AddOnField = ({ initialValue, getAddOn, onRemove, valuesHandler }) => {
  const [loading, setLoading] = useState({});

  const addon = {
    id: initialValue?.id || uuidv4(),
    name: initialValue?.name || "",
    values: initialValue?.values || [
      { id: uuidv4(), tag: "", price: "", image: "" },
    ],
  };

  const handleAddonNameChange = (newName) => {
    getAddOn({
      ...addon,
      name: newName,
    });
  };

  const handleValueChange = (valueIndex, field, newValue) => {
    const newValues = [...addon.values];
    newValues[valueIndex] = {
      ...newValues[valueIndex],
      [field]: newValue,
    };
    getAddOn({
      ...addon,
      values: newValues,
    });
  };

  const handleImageUpload = async (valueIndex, file) => {
    if (file) {
      try {
        setLoading({ valueIndex });
        const imageUrl = await uploadImgToCloud(file);
        const newValues = [...addon.values];
        newValues[valueIndex] = {
          ...newValues[valueIndex],
          image: imageUrl,
        };
        getAddOn({
          ...addon,
          values: newValues,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setLoading({});
      }
    }
  };

  const removeImage = (valueIndex) => {
    const newValues = [...addon.values];
    newValues[valueIndex] = {
      ...newValues[valueIndex],
      image: "",
    };
    getAddOn({
      ...addon,
      values: newValues,
    });
  };

  const isLoading = (valueIndex) => {
    return loading.valueIndex === valueIndex;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4 mb-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Addon Name"
          value={addon.name}
          onChange={(e) => handleAddonNameChange(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => onRemove("remove", addon)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          type="button"
        >
          <AiOutlineClose className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4 pl-4">
        {addon.values.map((val, valueIndex) => (
          <div
            key={val.id}
            className={`space-y-2 pb-4 ${
              valueIndex !== addon.values.length - 1
                ? "border-b-2 border-black"
                : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Tag"
                    value={val.tag}
                    onChange={(e) =>
                      handleValueChange(valueIndex, "tag", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={val.price}
                    onChange={(e) =>
                      handleValueChange(valueIndex, "price", e.target.value)
                    }
                    className="w-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => valuesHandler(addon, "remove", val.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    type="button"
                  >
                    <AiOutlineDelete className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id={`image-upload-${val.id}`}
                    onChange={(e) =>
                      handleImageUpload(valueIndex, e.target.files[0])
                    }
                  />
                  <label
                    htmlFor={`image-upload-${val.id}`}
                    className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    {isLoading(valueIndex) ? (
                      <div className="flex flex-col items-center text-gray-500">
                        <AiOutlineLoading3Quarters className="h-8 w-8 mb-2 animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    ) : val.image ? (
                      <div className="relative w-full">
                        <img
                          src={val.image}
                          alt="Preview"
                          className="max-h-40 mx-auto object-contain"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeImage(valueIndex);
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          type="button"
                        >
                          <AiOutlineClose className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <AiOutlineUpload className="h-8 w-8 mb-2" />
                        <span>Click to upload image</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => valuesHandler(addon, "add")}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          type="button"
        >
          <AiOutlinePlus className="h-4 w-4 mr-2" />
          Add Value
        </button>
      </div>
    </div>
  );
};

export default AddOnField;
