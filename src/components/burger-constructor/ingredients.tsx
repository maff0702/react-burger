import { FC } from 'react';
import { useSelector } from '../../hooks/hooks';

import styles from './burger-constructor.module.css';
import IngedientElement from './ingredient-element';

const Ingredients: FC = () => {
  const listIngredients = useSelector((state) => state.constructors.ingredients);
  return(  
    <div className={styles.wrapper__ingrediends}>
      {listIngredients.map((item, index) => (
        <IngedientElement key={item.newId} index={index} data={item} />
      ))}
    </div>
  )
}

export default Ingredients;
