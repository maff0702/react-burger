import { FC } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "../../hooks/hooks";
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { openModalIngredientDetails } from '../../store/ingredientsSlice';
import styles from './burger-ingredient.module.css';
import { TIngredient } from "../../types/ingredient";

interface IIngredientProps {
  ingredient: TIngredient
}

const IngredientCard: FC<IIngredientProps> = ({ingredient}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient
  });
  const clickIngredient = (): void =>{
    dispatch(openModalIngredientDetails({ingredient}));
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
        }}
      >
      <span className={styles.icon__counter}>{ ingredient.__v !== 0 && <Counter count={ingredient.__v} size="small" />}</span>
      <img className="mr-4 ml-4" src={ingredient.image} alt={ingredient.name} />
      <p className="mt-1 text text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary" /></p>
      <p className="text text_type_main-default">{ingredient.name}</p>
      </Link>
    </div>
  )
}

export default IngredientCard;
