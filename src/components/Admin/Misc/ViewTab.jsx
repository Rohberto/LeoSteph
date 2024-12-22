import PropTypes from "prop-types";

const ViewTab = ({ children, styles }) => {
  return (
    <div className={`w-full flex-1 min-h-screen overflow-y-scroll  ${styles}`}>
      {children}
    </div>
  );
};

ViewTab.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.string,
};

export default ViewTab;
