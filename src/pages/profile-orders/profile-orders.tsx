import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile-orders.module.css';
import { WSS_URL } from '../../utils/constants';
import OrderCard from '../../components/order-card/order-card';
import { wsConnectionStart, wsConnectionClosed } from '../../store/wsOrdersSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state :any) => state.wsOrders);
  
  useEffect(()=> {
    dispatch(wsConnectionStart(`${WSS_URL}?token=${localStorage.getItem('accessToken')}`));
    return () =>{
       dispatch(wsConnectionClosed());
    };
  },[dispatch])
  
  return (
   <div className={styles.order__tape}>
    {
      orders.length > 0 
      ? orders.map(el => (<OrderCard key={el._id} order={el} status />))
      : <>Error</>
    }
  </div>
    
  )
}

export default Orders;
