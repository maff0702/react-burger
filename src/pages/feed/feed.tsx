import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './feed.module.css';
import OrderCard from '../../components/order-card/order-card';

function Feed() { 
  
  return (
    <main className={styles.content__body}>
      <h1 className="text text_type_main-large mt-10">Лента заказов</h1>
      <div className={styles.order__container}>
        <div className={styles.order__tape}>
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
        <div className={styles.order__info}>
          <div className={styles.info__table}>
            <div className={styles.table__ready}>
              <p className="text text_type_main-medium">Готовы:</p>
              <div>
                <p className="text text_type_main-default">034533</p>
                <p className="text text_type_main-default">034533</p>
                <p className="text text_type_main-default">034533</p>
                <p className="text text_type_main-default">034533</p>
              </div>
            </div>
              <div className={styles.table__preparing}>
              <p className="text text_type_main-medium">В работе:</p>
              <div>
                <p className="text text_type_main-default">034533</p>
                <p className="text text_type_main-default">034533</p>
              </div>
            </div>
          </div>
          <div className={styles.order__all}>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className="text text_type_digits-large">28 752</p>
          </div>
          <div className={styles.order__today}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">138</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Feed;
