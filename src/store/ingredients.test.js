import reducer, {
  ingredientCurrentIncrement,
  ingredientCurrentDecrement,
  openModalIngredientDetails,
  closeModalIngredientDetails,
  deletedAllCurrentIngredient,
} from './ingredientsSlice';

const state = {
  dataIngredients: [],
  isError: false,
  isLoading: false,
  currentIngredient: null,
  isModalIngredientDetails: false,
};
const ingredient = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  name: "Краторная булка N-200i",
  price: 1255,
  proteins: 80,
  type: "bun",
  __v: 0,
  _id: "60d3b41abdacab0026a733c6",
}

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(state);
});

test('increases the number of ingredients currently in the constructor', () => {
  expect(reducer({
    ...state,
    dataIngredients: [ingredient],
  }, ingredientCurrentIncrement({item: ingredient}))).toEqual({
    ...state,
    dataIngredients: [{...ingredient, __v: 2}]
  })
})

test('decrement the number of ingredients currently in the constructor', () => {
  expect(reducer({
    ...state,
    dataIngredients: [{...ingredient, __v: 1}],
  }, ingredientCurrentDecrement({id: "60d3b41abdacab0026a733c6"}))).toEqual({
    ...state,
    dataIngredients: [ingredient]
  })
})

test('deleted the number of ingredients currently in the constructor', () => {
  expect(reducer({
    ...state,
    dataIngredients: [{...ingredient, __v: 1}],
  }, deletedAllCurrentIngredient())).toEqual({
    ...state,
    dataIngredients: [ingredient]
  })
})

test('modal open', () => {
  expect(reducer(state, openModalIngredientDetails({ingredient}))).toEqual({
    ...state,
    currentIngredient: ingredient,
    isModalIngredientDetails: true,
  })
})

test('modal close', () => {
  expect(reducer({
    ...state,
  currentIngredient: ingredient,
  isModalIngredientDetails: true,
  }, closeModalIngredientDetails())).toEqual({
    ...state,
    currentIngredient: null,
    isModalIngredientDetails: false,
  })
})
