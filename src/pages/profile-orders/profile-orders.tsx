import styles from './profile-orders.module.css';
import OrderCard from '../../components/order-card/order-card';

const Orders = () => {
  
  return (
   <div className={styles.order__tape}>
    <OrderCard />
    <OrderCard />
    <OrderCard />
    <OrderCard />
    <OrderCard />
    <OrderCard />
  </div>
    
  )
}

export default Orders;
