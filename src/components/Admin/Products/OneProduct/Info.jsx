import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
import { useState } from "react";

const Info = ({ name, images, tags, price, category }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const tagList = tags?.map((tag, idx) => (
    <span
      key={idx}
      className="text-sm px-2 py-1 rounded-md bg-gray-900 text-white"
    >
      {tag}
    </span>
  ));

  const showCategory = () => {
    const split = category?.name
      ?.trim()
      ?.split(" ")
      .map((name) => name?.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");

    return split;
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="font-semibold text-2xl mb-4">Product Info</div>
      <div className="flex flex-col sm:flex-row sm:gap-6 gap-4">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <img
            src={mainImage}
            alt={name}
            className="h-48 w-full sm:w-64 object-cover rounded-md"
          />
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 cursor-pointer border border-gray-300 rounded-md hover:shadow-lg"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="text-xl font-medium">{name}</div>
          <div className="flex flex-wrap items-center gap-2">{tagList}</div>
          <div className="flex items-center gap-4">
            <div className="font-medium">Price:</div>
            <div className="flex items-center">
              <Icon icon="tabler:currency-naira" width={24} />
              <span className="text-lg font-semibold">
                {Number(price).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="text-xl bg-cyan-700 text-center py-1 rounded-md text-white">
            {showCategory()}
          </div>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  id: PropTypes.string,
  category: PropTypes.object,
  name: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.array,
  price: PropTypes.number,
};

export default Info;
