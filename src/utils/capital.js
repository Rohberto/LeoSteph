const capitalizeFirstLetter = (str) => {
  if (typeof str !== "string") return str; // Ensure it's a string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export default capitalizeFirstLetter;
