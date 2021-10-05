import PropTypes from 'prop-types';
import { IOrderCard } from './order';
import { TOrdersState } from '../store/wsOrdersSlice';
import { TIngredient } from './ingredient';
import { TAuthState } from '../store/authSlice';
import { TConstructorState } from '../store/constructorSlice';

export type TAllState = TOrdersState
  | TIngredient
  | TAuthState
  | TConstructorState;

const ingredientsPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export default ingredientsPropType;