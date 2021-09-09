import styles from './modal.module.css';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
  const info = useSelector((state: any) => state.ingredients.currentIngredient)
  return(
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
  </div>
  )
}