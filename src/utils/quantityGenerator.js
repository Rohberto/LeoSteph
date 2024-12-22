const generateQuantityOptions = (orderLimit) => {
  const { min, max } = orderLimit;
  const options = [];
  let currentValue = min;

  while (currentValue <= max) {
    options.push(currentValue);

    if (currentValue < 500) {
      currentValue += 50;
    } else if (currentValue < 1000) {
      currentValue += 100;
    } else {
      currentValue += 500;
    }

    if (currentValue > max) {
      if (!options.includes(max)) {
        options.push(max);
      }
      break;
    }
  }

  return options;
};

export default generateQuantityOptions;
