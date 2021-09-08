import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import ingredientsPropType from '../../types/types.js'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ({ingredients,setActive,setIngredient,stateConstructor,setStateConstructor}) => {
  const clickIngredient = () =>{
    setActive(true);
    setIngredient(ingredients);
    if(ingredients.type === 'bun'){
      setStateConstructor({
        ...stateConstructor,
        bun: ingredients
      })
    }else{
      setStateConstructor({
        ...stateConstructor,
        ingredients: [
          ...stateConstructor.ingredients,
          ingredients
        ]
      })
    }
  }
  return(
    <div className={styles.cart__ingredient}
      onClick={clickIngredient}
    >
      <span className={styles.icon__counter}><Counter count={1} size="small" /></span>
      <img className="mr-4 ml-4" src={ingredients.image} alt={ingredients.name} />
      <p className="mt-1 text text_type_digits-default">{ingredients.price} <CurrencyIcon type="primary" /></p>
      <p className="text text_type_main-default">{ingredients.name}</p>
    </div>
  )
}

IngredientCard.propTypes = {
  ingredients: ingredientsPropType.isRequired,
  setActive: PropTypes.func.isRequired,
  setIngredient: PropTypes.func.isRequired,
  stateConstructor: PropTypes.shape({}),
  setStateConstructor: PropTypes.func.isRequired
};

export default IngredientCard;
