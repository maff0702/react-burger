import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { addCurrentIngredient, openModalIngredientDetails } from '../../store/ingredientsSlice';
import styles from './burger-ingredient.module.css';
import ingredientsPropType from '../../types/types'

const IngredientCard = ({ingredient}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient
});
  const clickIngredient = () =>{
    dispatch(addCurrentIngredient({ingredient}));
    dispatch(openModalIngredientDetails());
  }
  return(
    <div className={styles.cart__ingredient}
      onClick={clickIngredient}
      ref={dragRef}
    >
      <Link
        key={ingredient._id}
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location }
      }}>
      <span className={styles.icon__counter}>{ ingredient.__v !== 0 && <Counter count={ingredient.__v} size="small" />}</span>
      <img className="mr-4 ml-4" src={ingredient.image} alt={ingredient.name} />
      <p className="mt-1 text text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary" /></p>
      <p className="text text_type_main-default">{ingredient.name}</p>
      </Link>
    </div>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientsPropType.isRequired,
};

export default IngredientCard;
