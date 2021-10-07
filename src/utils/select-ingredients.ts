import { TIngredient } from "../types/ingredient";
import { IOrderCard } from "../types/order";

const SelectIngredients = (order: IOrderCard, dataIngredients: TIngredient[]) => {
	const ingredients: TIngredient[] = [];
  order.ingredients.forEach((el) => {
    dataIngredients.forEach((element) => {
      if (el === element._id) ingredients.push(element);
    });
  });
  
	return ingredients;
}

export default SelectIngredients;
