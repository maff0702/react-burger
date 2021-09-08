import { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import ingredientsPropType from '../../types/types.js'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDeatails from '../modal/ingredient-details';
import { BurgerIngredientsContext, SetBurgerIngredientsContext } from '../../services/BurgerIngredientsContext';
import { marginTopScroll } from '../../utils/Constants';
import Ingredients from './ingredients';

export default function BurgerIngredients({data}) {
  const [current, setCurrent] = useState('one');
  const [isModalActive, setModalActive] = useState(false);
  const [ingredient, setIngredient] = useState('');
  
  const ingredientsSection = useRef<null | HTMLElement>(null)

  const onTabClick = (e) => {
    e.preventDefault();
    const scrollSection = ingredientsSection.current;
    const ingredientItem = document.getElementById(`${e.currentTarget.id}-list`);    
    scrollSection && ingredientItem && scrollSection.scrollTo({
      top: ingredientItem.offsetTop-marginTopScroll,
      behavior: "smooth"
    });   
  }  
  
  const stateConstructor = useContext(BurgerIngredientsContext);
  const setStateConstructor = useContext(SetBurgerIngredientsContext);

  return (
    <section className={styles.burger__content +' pt-10 pb-10'}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div className={styles.dFlex + ' mt-5'}>
        <span onClick={onTabClick} id="bun">
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
        </span>
        <span onClick={onTabClick} id="sauce">
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          </span>
          <span onClick={onTabClick} id="main">
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </span>
      </div>
      <div className={styles.tCenter +" text text_type_main-default mt-3"}>
        {data.isError && <span>Невозможно загрузить данные, попробуйте обновить страницу</span>}
        {data.isLoading && <span>Идет загрузка ...</span>}
      </div>
      {data.dataIngredients.length > 0 && 
      <section className={styles.wrapper__ingrediends} ref={ingredientsSection}>
        <Ingredients
          data={data.dataIngredients}
          type="bun"
          id="bun-list"
          title="Булки"
          setActive={setModalActive}
          setIngredient={setIngredient}
          stateConstructor={stateConstructor}
          setStateConstructor={setStateConstructor}
        />
        <Ingredients
          data={data.dataIngredients}
          type="sauce"
          id="sauce-list"
          title="Соусы"
          setActive={setModalActive}
          setIngredient={setIngredient}
          stateConstructor={stateConstructor}
          setStateConstructor={setStateConstructor}
        />
        <Ingredients
          data={data.dataIngredients}
          type="main"
          id="main-list"
          title="Начинки"
          setActive={setModalActive}
          setIngredient={setIngredient}
          stateConstructor={stateConstructor}
          setStateConstructor={setStateConstructor}
        />
        
        <Modal
          active={isModalActive}
          setActive={setModalActive}
          title="Детали ингредиента"
        >
          {typeof(ingredient)=='object' ? <IngredientDeatails info={ingredient}/> : <div>Ошибка!</div>}
        </Modal>
      </section>}
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.shape({
    dataIngredients: PropTypes.arrayOf(ingredientsPropType.isRequired),
    isError: PropTypes.bool,
    isLoading: PropTypes.bool
  })
} 
