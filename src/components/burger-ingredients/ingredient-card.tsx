import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from "react-router-dom";

import { addCurrentIngredient, openModalIngredientDetails } from '../../store/ingredientsSlice';
import styles from './burger-ingredient.module.css';
import ingredientsPropType from '../../types/types.js'

const IngredientCard = ({ingredient,setActive}) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient
});
  const clickIngredient = () =>{
    setActive(true);
    dispatch(addCurrentIngredient({ingredient}));
    dispatch(openModalIngredientDetails());
    history.replace({ pathname: `${url}` + "ingredients" + `/` + `${ingredient._id}` });
  }
  return(
    <div className={styles.cart__ingredient}
      onClick={clickIngredient}
      ref={dragRef}
    >
      <span className={styles.icon__counter}>{ ingredient.__v !== 0 && <Counter count={ingredient.__v} size="small" />}</span>
      <img className="mr-4 ml-4" src={ingredient.image} alt={ingredient.name} />
      <p className="mt-1 text text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary" /></p>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientsPropType.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default IngredientCard;
