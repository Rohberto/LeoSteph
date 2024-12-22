const catchErrors = (error) => {
  return error?.response?.data?.message;
};

export default catchErrors;
