import { FC } from 'react';
import styles from './ingredient.module.css';
import { useSelector } from '../../hooks/hooks';
import { useParams } from 'react-router-dom';

import { TIngredient } from '../../types/ingredient';

const Ingredient: FC = () => {
  const { id } = useParams<{id: string}>();
  const {dataIngredients} = useSelector((state) => state.ingredients);
  const info: TIngredient = dataIngredients.filter((el)=>el._id === id)[0];

  return(
    <>
      {dataIngredients.length > 0 ?
      <div className={styles.details__ingredient}>
        <span><img src={info.image} alt={info.name} height='240'/></span>
        <p className="text text_type_main-medium mt-4">{info.name}</p>
        <span className={"mt-8 mb-5 "+styles.details__ingredient_info}>
          <p className={styles.details__ingredient_span+' text text_type_main-default text_color_inactive'}>
            Калории,ккал<br/>
            {info.calories}
          </p>
          <p className={styles.details__ingredient_span+' text text_type_main-default text_color_inactive ml-5'}>
            Белки, г<br/>
            <span>{info.proteins}</span>
            </p>
          <p className={styles.details__ingredient_span+' text text_type_main-default text_color_inactive ml-5'}>
            Жиры, г<br/>
            <span>{info.fat}</span>
            </p>
          <p className={styles.details__ingredient_span+' text text_type_main-default text_color_inactive ml-5'}>
            Углеводы, г<br/>
          <span>{info.carbohydrates}</span>
          </p>
        </span>
      </div> : <span>Загрузка...</span>
      }
    </>
  )
}

export default Ingredient;
