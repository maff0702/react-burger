import { Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-card.module.css';

const OrderCard = () => {
  const img = [
    'https://code.s3.yandex.net/react/code/bun-02.png',
    'https://code.s3.yandex.net/react/code/bun-02.png',
    "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-04-large.png",
    "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  ];
  
  return (
    <Link to="/profile/orders/12" className={styles.order__card}>
      <div className={styles.order__info}>
        <p className="text text_type_main-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <p className="text text_type_main-medium mt-6">Death Star Starship Main бургер</p>
      <div className={styles.card__info}>
        <div className={styles.card__image}>
          {img.length < 7 && img.map((item,i) => (<span style={{zIndex:49-i}}><img src={item} /></span>))}
          {img.length > 6 && img.map((item,i) => {
            if(i < 5) return <span style={{zIndex:49-i}}><img src={item} /></span>
            if(i === 6) return <span><p className="text text_type_digits-default">+{img.length-5}</p></span>
          })}
        </div>
          <p className={"mt-1 text text_type_digits-default "+styles.card__price}>
            500 <CurrencyIcon type="primary" />
          </p>
      </div>
    </Link>
  )
}

export default OrderCard;
