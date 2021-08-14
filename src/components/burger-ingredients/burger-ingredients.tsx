import React from 'react';
import styles from './style.module.css';
import data from '../../utils/data.json';
import { Tab, CurrencyIcon, Counter, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingridient = ({ingredients}) => (
  <>
  
  <div className={styles.cart__ingredient}>
    <img className="mr-4 ml-4" src={ingredients.image} alt={ingredients.name} />
    <p className="mt-1 text text_type_digits-default">{ingredients.price} <CurrencyIcon type="primary" /></p>
    <p className="text text_type_main-default">{ingredients.name}</p>
    <Counter count={233} size="small" />
  </div>
  
  </>
)

const Ingredients = ({data,type}) => (
  <div className={styles.burger__ingredient + " mt-6 mr-4 ml-4"}>
    { data.map((item, index) => {
      if(item.type === type){
        return <Ingridient key={index} ingredients={item}/>
      }
      })}
  </div>
)

export default function BurgerIngredients({data}) {
  
  const [current, setCurrent] = React.useState('one')
  return (
    <div className={styles.burger__content +' pt-10'}>
      <p className='text text_type_main-large'>Соберите бургер</p>
      <div style={{ display: 'flex' }}  className='mt-5'>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Сосусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <p className='text text_type_main-medium mt-10'>Булки</p>
      <Ingredients data={data} type={"bun"} />
      <p className='text text_type_main-medium mt-10'>Соусы</p>
      <Ingredients data={data} type={"sauce"} />
      <p className='text text_type_main-medium mt-10'>Начинки</p>
      <Ingredients data={data} type={"main"} />
    </div>
  );
};
