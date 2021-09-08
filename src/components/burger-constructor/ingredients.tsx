import PropTypes from 'prop-types';
import ingredientsPropType from '../../types/types.js'
import styles from './burger-constructor.module.css';
import IngedientElement from './ingredient-element';

const Ingredients = ({data}) => (
  <div className={styles.wrapper__ingrediends}>
    {data.map((item) => (<IngedientElement key={item._id} data={item}/>))}
  </div>
)

Ingredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropType.isRequired),
};

export default Ingredients;
