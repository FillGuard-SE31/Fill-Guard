// utils/cartUtils.js
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate itemsPrice as a number
  const itemsPriceNum = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  state.itemsPrice = Number(addDecimals(itemsPriceNum));

  // Free shipping for orders over $100, else $10 shipping
  const shippingPriceNum = state.itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = Number(addDecimals(shippingPriceNum));

  // Calculate tax as 15% of itemsPrice
  const taxPriceNum = 0.15 * state.itemsPrice;
  state.taxPrice = Number(addDecimals(taxPriceNum));

  // Total = itemsPrice + shippingPrice + taxPrice
  const totalPriceNum =
    state.itemsPrice + state.shippingPrice + state.taxPrice;
  state.totalPrice = addDecimals(totalPriceNum);

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
