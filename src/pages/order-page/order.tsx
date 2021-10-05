import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order.module.css';
import { requestOrders } from '../../store/wsOrdersSlice';
import dateFormat from '../../utils/date-format';
import SelectIngredients from '../../utils/select-ingredients';
import OrderPrice from '../../utils/order-price';
import OrderStatus from '../../utils/order-status';

function Order() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { dataIngredients } = useSelector((state :any) => state.ingredients);
  const { orders } = useSelector((state :any) => state.wsOrders);
  const url = history.location.pathname.split('/').slice(1)[0];
  let queryRequest = ''
  url === 'feed'
  ? queryRequest = '/all'
  : queryRequest = `?token=${localStorage.getItem('accessToken')}`;
  
  useEffect(() => {
    dispatch(requestOrders(queryRequest));
  }, [dispatch, queryRequest]);

  const id = history.location.pathname.split('/').pop();
  const order = orders.filter(el => el._id === id)[0];
  const ingredientsAll = order ? SelectIngredients(order, dataIngredients) : null;
  const ingredientsList = {};
  
  const ingredients = ingredientsAll && ingredientsAll.filter((item, index) => {
    if (ingredientsAll.indexOf(item) === index) {
      ingredientsList[item._id] = 1;
      return item;
    } else ingredientsList[item._id] = ingredientsList[item._id] + 1;
    return false;
  });
  
  return (
    <div className={styles.content__body}>
      { order
      ? <div> 
        <p className={"text text_type_main-medium "+styles.order__number}>#{order.number}</p>
        <p className="text text_type_main-medium mt-10">{order.name}</p>
        <div className="text text_type_main-default mt-3">{OrderStatus(order.status)}</div>
        <p className="text text_type_main-medium mt-15">Состав:</p>
        <div className={styles.ingredients__container}>
          { ingredients.map(el => (
            <div key={el._id} className={styles.ingredient__info}>
              <span className={styles.ingredient__image}><img src={el.image} alt={el.name} /></span>
              <p className={"text text_type_main-default "+styles.ingredient__title}>{el.name}</p>
              <p className={"mt-1 text text_type_digits-default "+styles.order__price}>
                <span>{ingredientsList[el._id]} x {el.price}</span> <CurrencyIcon type="primary" />
              </p>
            </div>
          ))}
        </div>
        <div className={styles.order__info}>
          <p className="text text_type_main-default text_color_inactive">{dateFormat(order.updatedAt)}</p>
          <p className={"mt-1 text text_type_digits-default "+styles.order__price}>
              <span>{OrderPrice(ingredientsAll)}</span> <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
      : <div className="text text_type_main-medium mt-10">Такого заказа не найдено ....</div>
      }
    </div>
  );
}

export default Order;
