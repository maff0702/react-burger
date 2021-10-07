import React, { FC } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { Link, useHistory } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-card.module.css';
import dateFormat from '../../utils/date-format';
import OrderPrice from '../../utils/order-price';
import SelectIngredients from '../../utils/select-ingredients';
import OrderStatus from '../../utils/order-status';
import { orderModalOpen } from '../../store/wsOrdersSlice';

import { IOrderCard } from '../../types/order';
import { TIngredient } from '../../types/ingredient';

interface IOrderCardProps {
  readonly order: IOrderCard;
  status?: boolean;
}

const OrderCard: FC<IOrderCardProps> = ({ order, status }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = history.location;
  const { dataIngredients } = useSelector((state) => state.ingredients);
  const ingredients: TIngredient[] = SelectIngredients(order, dataIngredients);
  const path: string = history.location.pathname;
  const handleClick = (): void => {
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
          {ingredients.length < 7 && ingredients.map((item: TIngredient, i: number) => (
            <span key={i} style={{zIndex:49-i}}><img src={item.image} alt={item.name} /></span>
          ))}
          {ingredients.length > 6 && ingredients.map((item: TIngredient, i: number) => {
            if(i < 5) return <span key={i} style={{zIndex:49-i}}><img src={item.image} alt={item.name} /></span>
            if(i === 6) return <span key={i} ><p className="text text_type_digits-default">+{order.ingredients.length-5}</p></span>
            return null;
          })}
        </div>
          <div className={"mt-1 text text_type_digits-default "+styles.card__price}>
            {OrderPrice(ingredients)} <CurrencyIcon type="primary" />
          </div>
      </div>
    </Link>
  )
}

export default OrderCard;
