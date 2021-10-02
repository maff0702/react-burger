const SelectIngredients = (order, dataIngredients) => {
	const ingredients = [] as any;
  order.ingredients.forEach((el) => {
    dataIngredients.forEach((element) => {
      if (el === element._id) ingredients.push(element);
    });
  });
	return ingredients;
}

export default SelectIngredients;
