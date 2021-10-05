import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile-orders.module.css';
import { WSS_URL } from '../../utils/constants';
import OrderCard from '../../components/order-card/order-card';
import { wsConnectionStart, wsConnectionClosed } from '../../store/wsOrdersSlice';
import { requestCheckAuth } from '../../store/authSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, statusCode, message } = useSelector((state :any) => state.wsOrders);
  const token = localStorage.getItem('accessToken');

  useEffect(()=> {
    if (statusCode === 1006 && message === "Invalid or missing token" ) {
      dispatch(requestCheckAuth());
      dispatch(wsConnectionStart(`${WSS_URL}?token=${token}`));
    }
  },[dispatch, statusCode, message, token]);
  
  useEffect(()=> {
    dispatch(wsConnectionStart(`${WSS_URL}?token=${token}`));
    return () =>{
      dispatch(wsConnectionClosed());
    };
  },[dispatch, message, token]);
  
  return (
   <div className={styles.order__tape}>
    {/* {isLoading && <>Загрузка...</>} */}
    {
      !isLoading && orders?.length > 0 
      ? [...orders].reverse().map(el => (<OrderCard key={el._id} order={el} status />))
      : <>Загрузка...</>
    }
  </div>
    
  )
}

export default Orders;
