import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order.module.css';

function Order() {
  
  return (
    <main className={styles.content__body}>
      <p className={"text text_type_main-medium "+styles.order__number}>#034535</p>
      <p className="text text_type_main-medium mt-10">Black Hole Singularity острый бургер</p>
      <p className="text text_type_main-default mt-3">Выполнен</p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <div className={styles.ingredients__container}>
        <div className={styles.ingredient__info}>
          <span className={styles.ingredient__image}><img src="https://code.s3.yandex.net/react/code/meat-04-mobile.png"/></span>
          <p className={"text text_type_main-default "+styles.ingredient__title}>Флюоресцентная булка R2-D3</p>
          <p className={"mt-1 text text_type_digits-default "+styles.order__price}>
            <span>2 x 500</span> <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
      <div className={styles.order__info}>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
        <p className={"mt-1 text text_type_digits-default "+styles.order__price}>
            <span>500</span> <CurrencyIcon type="primary" />
        </p>
      </div>
    </main>
  );
}

export default Order;
