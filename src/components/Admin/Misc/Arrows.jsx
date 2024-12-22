/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react/dist/iconify.js";

export const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        marginRight: "-1rem",
      }}
      onClick={onClick}
    >
      <Icon icon="carbon:next-outline" width={36} color="black" />
    </div>
  );
};

export const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        marginLeft: "-1rem",
      }}
      onClick={onClick}
    >
      <Icon icon="carbon:previous-outline" width={36} color="black" />
    </div>
  );
};
