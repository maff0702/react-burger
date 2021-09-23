import PropTypes from 'prop-types';

import styles from './burger-ingredient.module.css';
import IngredientCard from "./ingredient-card";
import ingredientsPropType from '../../types/types.js'

const Ingredients = ({data,type,title}) => (
  <section>
    <h3 className='text text_type_main-medium three'>{title}</h3>
    <div className={styles.burger__ingredient + " mt-6 mr-2 ml-4"}>
      {data.map((item) => (
        item.type === type &&
          <IngredientCard 
            key={item._id}
            ingredient={item}
          />
      ))}
    </div>
  </section>
)

Ingredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropType.isRequired),
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Ingredients;