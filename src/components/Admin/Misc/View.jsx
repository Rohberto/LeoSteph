import PropTypes from "prop-types";

const View = ({ children, styles }) => {
  return (
    <div
      className={`w-full flex flex-col gap-y-2 h-full overflow-hidden ${styles}`}
    >
      {children}
    </div>
  );
};

View.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.string,
};

export default View;
