import { FC } from 'react';

import styles from './burger-ingredient.module.css';
import IngredientCard from "./ingredient-card";
import { TIngredient } from '../../types/ingredient';

interface IIngredientsPros {
  data: TIngredient[];
  type: string;
  title: string;
}

const Ingredients: FC<IIngredientsPros> = ({data, type, title}) => (
  <section>
    <h3 className='text text_type_main-medium three'>{title}</h3>
    <div className={styles.burger__ingredient + " mt-6 mr-2 ml-4"}>
      {data.map((item: TIngredient) => (
        item.type === type &&
          <IngredientCard 
            key={item._id}
            ingredient={item}
          />
      ))}
    </div>
  </section>
)

export default Ingredients;
