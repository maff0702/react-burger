import { FC } from 'react';
import { useSelector } from '../../hooks/hooks';

import styles from './burger-constructor.module.css';
import IngedientElement from './ingredient-element';
import { TIngredient } from '../../types/ingredient';

export type TIngredientItem = TIngredient & {newId: number};

const Ingredients: FC = () => {
  const listIngredients:TIngredientItem[] = useSelector((state) => state.constructors.ingredients);
  return(  
    <div className={styles.wrapper__ingrediends}>
      {listIngredients.map((item: TIngredientItem, index: number) => (
        <IngedientElement key={item.newId} index={index} data={item} />
      ))}
    </div>
  )
}

export default Ingredients;
