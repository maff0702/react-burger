import styles from './modal.module.css';
import readyIcon from '../../images/ready-icon.gif';
import PropTypes from 'prop-types';

export default function OrderDetails({info}) {
  return(
  <div className={styles.details__order}>
    <p className="text text_type_digits-large  mt-4">{info}</p>
    <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
    <span className="mt-15"><img src={readyIcon} alt="Готово" height='120'/></span>
    <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
    <p className="text text_type_main-default text_color_inactive mt-2 mb-20">Дождитесь готовности на орбитальной станции</p>
  </div>
  )
}

OrderDetails.propTypes = {
  info: PropTypes.number.isRequired
};
