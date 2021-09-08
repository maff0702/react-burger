import IngredientCard from "./ingredient-card";
import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import ingredientsPropType from '../../types/types.js'

const Ingredients = ({data,type,id,title,setActive,setIngredient,stateConstructor,setStateConstructor}) => (
  <section>
    <h3 className='text text_type_main-medium three' id={id}>{title}</h3>
    <div className={styles.burger__ingredient + " mt-6 mr-2 ml-4"}>
      { data.map((item) => (
        item.type === type &&
          <IngredientCard 
            key={item._id}
            ingredients={item}
            setActive={setActive}
            setIngredient={setIngredient}
            stateConstructor={stateConstructor}
            setStateConstructor={setStateConstructor}
          />
      ))}
    </div>
  </section>
)

Ingredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropType.isRequired),
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  setIngredient: PropTypes.func.isRequired,
  stateConstructor: PropTypes.shape({}),
  setStateConstructor: PropTypes.func.isRequired
};

export default Ingredients;