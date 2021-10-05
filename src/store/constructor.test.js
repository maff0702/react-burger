import reducer, {
  addElementConstructor,
  addBunConstructor,
  deleteElementConstructor,
  moveIngredientConstructor,
  openModalOrderDetails,
  closeModalOrderDetails,
} from './constructorSlice';

const state = {
  ingredients: [],
  bun: null,
  order: {
    number: null,
    name: '',
    isError: false,
    isLoading: false,
  },
  isModalOrderDetails: false,
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

test('add element to constructor', () => {
  expect(reducer({
    ...state,
    ingredients: [],
  }, addElementConstructor({item: ingredient}))).toEqual({
    ...state,
    ingredients: [{...ingredient, newId: 0}],
  })
});

test('add or change a bun in the constructor', () => {
  expect(reducer(state, addBunConstructor({item: ingredient}))).toEqual({
    ...state,
    bun: ingredient,
  })
});

test('delete element in constructor', () => {
  expect(reducer({
    ...state,
    ingredients: [ingredient],
  }, deleteElementConstructor({index: 0}))).toEqual({
    ...state,
    ingredients: []
  })
});

test('swap the ingredients in the sheet', () => {
  expect(reducer({
    ...state,
    ingredients: [ingredient,ingredient],
  }, moveIngredientConstructor({dragIndex: 0, hoverIndex: 1}))).toEqual({
    ...state,
    ingredients: [ingredient,ingredient]
  })
});

test('modal open', () => {
  expect(reducer(state, openModalOrderDetails())).toEqual({
    ...state,
    isModalOrderDetails: true,
  })
});

test('modal close', () => {
  expect(reducer(state, closeModalOrderDetails())).toEqual({
    ...state,
    isModalOrderDetails: false,
  })
});
