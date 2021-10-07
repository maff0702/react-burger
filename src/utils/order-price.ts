import { TIngredient } from "../types/ingredient";

const OrderPrice = (ingredients: TIngredient[]) => {
  const price = ingredients.reduce((sum: number, cur: TIngredient) => {
    return sum + cur.price;
  }, 0);

  return price;
}

export default OrderPrice;
