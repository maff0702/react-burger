import { useSelector } from '../../hooks/hooks';

import styles from './order-details.module.css';
import readyIcon from '../../images/ready-icon.gif';

export default function OrderDetails() {
  const { number, isError, isLoading } = useSelector((state) => state.constructors.order);
  if(isError){
    return <>Ошибка попробуйте еще раз ...</>
  }
  if(isLoading){
    return <>Идет загрузка ...</>
  }
  return ( 
  <div className={styles.details__order}>
    <p className="text text_type_digits-large mt-4">{number}</p>
    <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
    <span className="mt-15"><img src={readyIcon} alt="Готово" height='120'/></span>
    <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
    <p className="text text_type_main-default text_color_inactive mt-2 mb-20">Дождитесь готовности на орбитальной станции</p>
  </div> 
  )
}
