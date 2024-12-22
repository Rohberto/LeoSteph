const validateData = (obj) => {
  return Object.values(obj).every((value) => value !== "");
};

export default validateData;
