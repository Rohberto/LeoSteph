const calculatePrice = ({ minQuantity, basePrice, quantity, addOns }) => {
  const unitPrice = basePrice / minQuantity;
  let totalPrice = unitPrice * quantity;
  let addOnsTotalPrice = 0;

  Object.values(addOns).forEach((addOn) => {
    if (addOn?.selectedValue?.price) {
      const addOnUnitPrice = addOn.selectedValue.price / minQuantity;
      addOnsTotalPrice += addOnUnitPrice * quantity;
      totalPrice += addOnUnitPrice * quantity;
    }
  });

  // Apply bulk discounts
  if (quantity >= 500 && quantity < 1000) {
    totalPrice *= 0.9; // 10% discount
    addOnsTotalPrice *= 0.9; // 10% discount
  } else if (quantity >= 1000) {
    totalPrice *= 0.85; // 15% discount
    addOnsTotalPrice *= 0.85; // 15% discount
  }

  return { totalPrice, addOnsTotalPrice };
};

export const calculateCartPrice = ({
  minQuantity,
  basePrice,
  quantity,
  fixedQuantity,
  previousTotalPrice,
}) => {
  const unitPrice = basePrice / minQuantity;

  let totalPrice = unitPrice * quantity;
  let addOnsUnitPrice =
    (previousTotalPrice - unitPrice * fixedQuantity) / fixedQuantity;
  let addOnsTotalPrice = addOnsUnitPrice * quantity;

  totalPrice += addOnsTotalPrice;

  // Apply bulk discounts
  if (quantity >= 500 && quantity < 1000) {
    totalPrice *= 0.9; // 10% discount
    addOnsTotalPrice *= 0.9; // 10% discount
  } else if (quantity >= 1000) {
    totalPrice *= 0.85; // 15% discount
    addOnsTotalPrice *= 0.85; // 15% discount
  }

  return { totalPrice, addOnsTotalPrice };
};

export default calculatePrice;
