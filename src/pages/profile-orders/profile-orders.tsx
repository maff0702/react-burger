import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile-orders.module.css';
import { WSS_URL } from '../../utils/constants';
import OrderCard from '../../components/order-card/order-card';
import { wsConnectionStart, wsConnectionClosed } from '../../store/wsOrdersSlice';
import AuthService from '../../services/auth-service';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state :any) => state.wsOrders);
  // if (statusCode === 1006) {
  //   AuthService.refreshToken();
  //   dispatch(wsConnectionStart(`${WSS_URL}?token=${localStorage.getItem('accessToken')}`));
  // }
  useEffect(()=> {
    dispatch(wsConnectionStart(`${WSS_URL}?token=${localStorage.getItem('accessToken')}`));
    return () =>{
       dispatch(wsConnectionClosed());
    };
  },[dispatch])
  
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
