import React from 'react';
import styles from './style.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export default function BurgerConstructor({data}) {
  
  return (
    <div className={styles.constructor__content +' pt-25 pb-10'}>
      <section className={styles.constructor__ingredients} >
      <span className="ml-8"> 
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name + " (верх)"}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </span>
        <div className={styles.wrapper__ingrediends}>
          <span>
            <DragIcon type="primary" />
            <ConstructorElement
              text={data[6].name}
              price={data[6].price}
              thumbnail={data[6].image}
            />
          </span>
          <span>
            <DragIcon type="primary" />
            <ConstructorElement
              text={data[4].name}
              price={data[4].price}
              thumbnail={data[4].image}
            />
          </span>
          <span>
            <DragIcon type="primary" />
            <ConstructorElement
              text={data[7].name}
              price={data[7].price}
              thumbnail={data[7].image}
            />
          </span>
          <span>
            <DragIcon type="primary" />
            <ConstructorElement
              text={data[8].name}
              price={data[8].price}
              thumbnail={data[8].image}
            />
          </span>
          <span>
            <DragIcon type="primary" />
            <ConstructorElement
              text={data[8].name}
              price={data[8].price}
              thumbnail={data[8].image}
            />
          </span>
          <span>
            <DragIcon type="primary" />
            <ConstructorElement
              text={data[12].name}
              price={data[12].price}
              thumbnail={data[12].image}
            />
          </span>
          <span>
            <DragIcon type="primary" />
            <ConstructorElement
              text={data[6].name}
              price={data[6].price}
              thumbnail={data[6].image}
            />
          </span>
        </div>
        <span className="pl-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={data[0].name + " (низ)"}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </span>
      </section>  
      <div className={"mt-10 " + styles.constructor__info}>
        <span className="text text_type_digits-medium mr-10"><span>1000</span><CurrencyIcon type="primary" /></span>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
