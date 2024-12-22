import { PropTypes } from "prop-types";

const Category = ({ name, image, id, onRemove }) => {
  return (
    <div className="col-span-1 cursor-pointer p-2 bg-green-600 text-white flex flex-row items-center justify-between rounded-md">
      <div className="">{name}</div>
      <div className="text-gray-900 hover:underline hover:underline-offset-1">
        <a href={image} target="_blank" rel="noopener noreferrer">
          view image
        </a>
      </div>
      <div onClick={() => onRemove(id)} className="text-rose-600">
        X
      </div>
    </div>
  );
};

const props = {
  name: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  onRemove: PropTypes.func,
};

Category.propTypes = props;

export default Category;
