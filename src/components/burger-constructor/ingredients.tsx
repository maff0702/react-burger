import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ingredientsPropType from '../../types/types'
import styles from './burger-constructor.module.css';
import IngedientElement from './ingredient-element';

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
