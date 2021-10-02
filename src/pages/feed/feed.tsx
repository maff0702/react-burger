import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './feed.module.css';
import { WSS_URL } from '../../utils/constants';
import OrderCard from '../../components/order-card/order-card';
import { wsConnectionStart, wsConnectionClosed } from '../../store/wsOrdersSlice';

function Feed() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state :any) => state.wsOrders);

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
            orders.length > 0 
            ? orders.map(el => (<OrderCard key={el._id} order={el} status={false} />))
            : <>Error</>
          }
        </div>
        <div className={styles.order__info}>
          <div className={styles.info__table}>
            <div className={styles.table__ready}>
              <p className="text text_type_main-medium">Готовы:</p>
              <div>
                {
                  orders.length > 0 
                  ? orders.map(el => (
                    el.status === 'done' && <p className="text text_type_main-default mr-5" key={el._id} >{el.number}</p>
                  ))
                  : <>Error</>
                }
              </div>
            </div>
              <div className={styles.table__preparing}>
              <p className="text text_type_main-medium">В работе:</p>
              <div>
                {
                  orders.length > 0 
                  ? orders.map(el => (
                    el.status !== 'done' && <p className="text text_type_main-default" key={el._id} >{el.number}</p>
                  ))
                  : <>Error</>
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
