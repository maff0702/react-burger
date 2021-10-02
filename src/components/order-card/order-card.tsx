import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-card.module.css';
import dateFormat from '../../utils/date-format';
import OrderPrice from '../../utils/order-price';
import SelectIngredients from '../../utils/select-ingredients';
import OrderStatus from '../../utils/order-status';
import { orderModalOpen } from '../../store/wsOrdersSlice';

const OrderCard = ({ order, status }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = history.location;
  const { dataIngredients } = useSelector((state :any) => state.ingredients);
  const ingredients = SelectIngredients(order, dataIngredients);
  const path = history.location.pathname;
  const handleClick = () =>{
    dispatch(orderModalOpen(order.number));
  }

  return (
    <Link
        key={order._id}
        to={{
          pathname: `${path}/${order._id}`,
          state: { background: location }
      }}
      onClick={handleClick}
      className={styles.order__card}
      >
      <div className={styles.order__info}>
        <p className="text text_type_main-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">{dateFormat(order.updatedAt)}</p>
      </div>
      <p className="text text_type_main-medium mt-6">{
        order.name.length > 60 
        ? `${order.name.slice(0, 60)}...`
        : order.name
      }</p>
      { status && OrderStatus(order.status) }
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
            {OrderPrice(ingredients)} <CurrencyIcon type="primary" />
          </p>
      </div>
    </Link>
  )
}

export default OrderCard;
