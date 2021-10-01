import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-card.module.css';

const OrderCard = ({ order, status }) => {
  const { dataIngredients } = useSelector((state :any) => state.ingredients);
  const ingredients = [] as any;
  order.ingredients.forEach((el) => {
    dataIngredients.forEach((element) => {
      if (el === element._id) ingredients.push(element);
    });
  });
  const price = ingredients.reduce((sum, cur) => {
    return sum + cur.price;
  }, 0);
  const a = moment(order.updatedAt).format('dddd, MMMM DD YYYY, h:mm:ss');
  console.log(a);
  
  return (
    <Link to="/profile/orders/12" className={styles.order__card}>
      <div className={styles.order__info}>
        <p className="text text_type_main-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">{order.updatedAt}</p>
      </div>
      <p className="text text_type_main-medium mt-6">{
        order.name.length > 30 
        ? `${order.name.slice(0, 30)}...`
        : order.name
      }</p>
      {
        status && (
          order.status === "done" && <p className={"text text_type_main-default mt-2 "+styles.order__status_done}
        >Выполнен</p>
        ) 
      }
      <div className={styles.card__info}>
        <div className={styles.card__image}>
          {ingredients.length < 7 && ingredients.map((item, i) => (
            <span key={i} style={{zIndex:49-i}}><img src={item.image} /></span>
          ))}
          {ingredients.length > 6 && ingredients.map((item, i) => {
            if(i < 5) return <span key={i} style={{zIndex:49-i}}><img src={item.image} /></span>
            if(i === 6) return <span key={i}><p className="text text_type_digits-default">+{order.ingredients.length-5}</p></span>
          })}
        </div>
          <p className={"mt-1 text text_type_digits-default "+styles.card__price}>
            {price} <CurrencyIcon type="primary" />
          </p>
      </div>
    </Link>
  )
}

export default OrderCard;
