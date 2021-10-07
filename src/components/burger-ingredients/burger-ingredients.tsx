import { useState, useRef, FC } from 'react';
import { useSelector } from '../../hooks/hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredient.module.css';
import Ingredients from './ingredients';
import { TIngredient } from "../../types/ingredient";

interface IRequestIngredients {
  dataIngredients: TIngredient[];
  isLoading: boolean;
  isError: boolean;
}

const BurgerIngredients: FC = () => {
  const {isError, isLoading, dataIngredients}: IRequestIngredients = useSelector((state) => state.ingredients);
  const [current, setCurrent] = useState('one');
  const ingredientsSection = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLSpanElement>(null);
  const sauceRef = useRef<HTMLSpanElement>(null);
  const mainRef = useRef<HTMLSpanElement>(null);
  
  const onTabScroll = (): void => {
    const scrollSection: number | undefined = ingredientsSection?.current?.getBoundingClientRect().top;
    const bunList: number | undefined = bunRef?.current?.getBoundingClientRect().top;
    const sauceList: number | undefined = sauceRef?.current?.getBoundingClientRect().top;
    const mainList: number | undefined = mainRef?.current?.getBoundingClientRect().top;
    if(scrollSection && bunList && sauceList && mainList) {
      if(bunList <= scrollSection) setCurrent('one');
      if(sauceList <= scrollSection) setCurrent('two');
      if(mainList <= scrollSection) setCurrent('three');
    }
  };

  return (
    <section className={styles.burger__content +' pt-10 pb-10'}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      {dataIngredients?.length > 0 && <div className={styles.dFlex + ' mt-5'}>
        <span onClick={()=>{bunRef?.current?.scrollIntoView({behavior: "smooth"})}} id="bun">
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
        </span>
        <span onClick={()=>{sauceRef?.current?.scrollIntoView({behavior: "smooth"})}} id="sauce">
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          </span>
          <span onClick={()=>{mainRef?.current?.scrollIntoView({behavior: "smooth"})}} id="main">
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </span>
      </div>}
      <div className={styles.tCenter +" text text_type_main-default mt-3"}>
        {isError && <span>Невозможно загрузить данные, попробуйте обновить страницу</span>}
        {isLoading && <span>Идет загрузка ...</span>}
      </div>
      {dataIngredients?.length > 0 && 
      <section 
        className={styles.wrapper__ingrediends}
        ref={ingredientsSection}
        onScroll={onTabScroll}
      >
        <section ref={bunRef}>
          <Ingredients
            data={dataIngredients}
            type="bun"
            title="Булки"
          />
        </section>
        <section ref={sauceRef}>
          <Ingredients
            data={dataIngredients}
            type="sauce"
            title="Соусы"
          />
        </section>
        <section ref={mainRef}>
          <Ingredients
            data={dataIngredients}
            type="main"
            title="Начинки"
          />
        </section>
      </section>}
    </section>
  );
}

export default BurgerIngredients;
