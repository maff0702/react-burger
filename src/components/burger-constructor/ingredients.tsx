import PropTypes from 'prop-types';
import ingredientsPropType from '../../types/types.js'
import styles from './burger-constructor.module.css';
import IngedientElement from './ingredient-element';
import { useSelector } from 'react-redux';

const Ingredients = () => {
  const listIngredients = useSelector((state: any) => state.constructors.ingredients);
  return(  
  <div className={styles.wrapper__ingrediends}>
    {listIngredients.map((item,index) => (<IngedientElement key={item.newId} index={index} data={item} />))}
  </div>
  )
}

Ingredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropType.isRequired),
};

export default Ingredients;
