import { useDispatch, useSelector } from '../../hooks/hooks';
import { useEffect } from 'react';

import styles from './feed.module.css';
import { WSS_URL } from '../../utils/constants';
import OrderCard from '../../components/order-card/order-card';
import { wsConnectionStart, wsConnectionClosed } from '../../store/wsOrdersSlice';
import { IOrderCard } from '../../types/order';

function Feed() {
  const dispatch = useDispatch();
  const orders: IOrderCard[] | null = useSelector((state) => state.wsOrders.orders);
  const { total, totalToday, isLoading } = useSelector((state) => state.wsOrders);

  useEffect(()=> {
    dispatch(wsConnectionStart(`${WSS_URL}/all`));
    return () =>{
       dispatch(wsConnectionClosed());
    };
  },[dispatch])
  
  return (
    <main className={styles.content__body}>
      <h1 className="text text_type_main-large mt-10">Лента заказов</h1>
      <div className={styles.order__container}>
        <div className={styles.order__tape}>
          {
            !isLoading && orders
            ? orders.map((el: IOrderCard) => (<OrderCard key={el._id} order={el} status={false} />))
            : <>Загрузка...</>
          }
        </div>
        <div className={styles.order__info}>
          <div className={styles.info__table}>
            <div className={styles.table__ready}>
              <p className="text text_type_main-medium">Готовы:</p>
              <div>
                {
                  !isLoading && orders
                  ? orders.map((el: IOrderCard) => (
                    el.status === 'done' && <p className="text text_type_main-default mr-5" key={el._id} >{el.number}</p>
                  ))
                  : <>Загрузка...</>
                }
              </div>
            </div>
              <div className={styles.table__preparing}>
              <p className="text text_type_main-medium">В работе:</p>
              <div>
                {
                  !isLoading && orders
                  ? orders.map((el: IOrderCard) => (
                    el.status !== 'done' && <p className="text text_type_main-default" key={el._id} >{el.number}</p>
                  ))
                  : <>Загрузка...</>
                }
              </div>
            </div>
          </div>
          <div className={styles.order__all}>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className="text text_type_digits-large">{total}</p>
          </div>
          <div className={styles.order__today}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Feed;
