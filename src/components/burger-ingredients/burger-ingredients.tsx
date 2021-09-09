import { useState, useRef, useEffect } from 'react';
import styles from './burger-ingredient.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDeatails from '../modal/ingredient-details';
import Ingredients from './ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { requestIngredients } from '../../store/ingredientsSlice';

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.ingredients);
  const [current, setCurrent] = useState('one');
  const [isModalActive, setModalActive] = useState(false);
  const ingredientsSection = useRef(null) as any
  const bunRef = useRef(null) as any
  const sauceRef = useRef(null) as any
  const mainRef = useRef(null) as any

  useEffect(() => {dispatch(requestIngredients())},[dispatch])

  const onTabScroll = () => {
    const scrollSection = ingredientsSection.current.getBoundingClientRect().top;
    const bunList = bunRef.current.getBoundingClientRect().top;
    const sauceList = sauceRef.current.getBoundingClientRect().top;
    const mainList = mainRef.current.getBoundingClientRect().top;
    if(bunList <= scrollSection) setCurrent('one');
    if(sauceList <= scrollSection) setCurrent('two');
    if(mainList <= scrollSection) setCurrent('three');
  }
  

  return (
    <section className={styles.burger__content +' pt-10 pb-10'}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div className={styles.dFlex + ' mt-5'}>
        <span onClick={()=>{bunRef.current.scrollIntoView({behavior: "smooth"})}} id="bun">
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
        </span>
        <span onClick={()=>{sauceRef.current.scrollIntoView({behavior: "smooth"})}} id="sauce">
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          </span>
          <span onClick={()=>{mainRef.current.scrollIntoView({behavior: "smooth"})}} id="main">
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
      <section 
        className={styles.wrapper__ingrediends}
        ref={ingredientsSection}
        onScroll={onTabScroll}
      >
        <span ref={bunRef}>
          <Ingredients
            data={data.dataIngredients}
            type="bun"
            title="Булки"
            setActive={setModalActive}
          />
        </span>
        <span ref={sauceRef}>
          <Ingredients
            data={data.dataIngredients}
            type="sauce"
            title="Соусы"
            setActive={setModalActive}
          />
        </span>
        <span ref={mainRef}>
          <Ingredients
            data={data.dataIngredients}
            type="main"
            title="Начинки"
            setActive={setModalActive}
          />
        </span>
        <Modal
          active={isModalActive}
          setActive={setModalActive}
          title="Детали ингредиента"
        >
          <IngredientDeatails/>
        </Modal>
      </section>}
    </section>
  );
}