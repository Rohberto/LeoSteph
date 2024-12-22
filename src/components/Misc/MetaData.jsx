import { Helmet } from "react-helmet-async";
import { PropTypes } from "prop-types";
import { lesostephImg } from "../../const";

const MetaData = ({ title, description, type }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={lesostephImg} />

      {/* Facebook Meta tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter Meta tags */}
      <meta name="twitter:creator" content="Leosteph" />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

const props = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
};

MetaData.propTypes = props;

export default MetaData;
