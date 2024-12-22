import PropTypes from "prop-types";

const Others = ({ intro, description, addOns, createdAt, updatedAt }) => {
  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  const renderDescription = description?.split("\n").map((desc, idx) =>
    desc === "" ? (
      <div key={idx} className="h-3"></div>
    ) : (
      <p key={idx} className="text-sm leading-6">
        {desc}
      </p>
    )
  );

  const renderAddOns = addOns?.map(({ name, values }, index) => (
    <div key={index} className="mb-2">
      <div className="font-medium">{name}:</div>
      <div className="flex flex-wrap gap-2">
        {values?.map((val, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-sm bg-gray-200 rounded-md border border-gray-300"
          >
            {val.tag} - #{val.price}
          </span>
        ))}
      </div>
    </div>
  ));

  return (
    <div className="bg-white w-full mt-4 p-4 rounded-md shadow-md">
      <h2 className="font-semibold text-xl mb-4">Full Details</h2>

      <div className="flex flex-col gap-4">
        {/* Summary */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="font-medium text-lg">Summary:</div>
          <p className="text-sm">{intro}</p>
        </div>

        {/* Description */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="font-medium text-lg">Description:</div>
          <div>{renderDescription}</div>
        </div>

        {/* Add-ons */}
        {addOns?.length > 0 && (
          <div className="flex flex-col">
            <div className="font-medium text-lg">Add-ons:</div>
            {renderAddOns}
          </div>
        )}

        {/* Dates */}
        <div className="flex flex-col gap-2">
          <div>
            <div className="font-medium text-lg">Date Created:</div>
            <p className="text-sm">{formatDate(createdAt)}</p>
          </div>
          <div>
            <div className="font-medium text-lg">Date Updated:</div>
            <p className="text-sm">{formatDate(updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Others.propTypes = {
  intro: PropTypes.string,
  description: PropTypes.string,
  addOns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          tag: PropTypes.string,
          price: PropTypes.number,
        })
      ),
    })
  ),
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
};

export default Others;
