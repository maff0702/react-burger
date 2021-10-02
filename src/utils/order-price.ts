const OrderPrice = (ingredients) => {
  const price = ingredients.reduce((sum, cur) => {
    return sum + cur.price;
  }, 0);

  return price;
}

export default OrderPrice;
