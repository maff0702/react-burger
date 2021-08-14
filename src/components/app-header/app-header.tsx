import styles from './style.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container +' pt-4 pb-4 '+ styles.header__content}>
        <nav className={styles.header__menu}>
          <ul className={styles.header__list}>
            <li className={styles.header__link + ' pr-5 ' + styles.header__link_active}>
              <BurgerIcon type="primary" />
              <span className="ml-2">Конструктор</span>
            </li>
            <li className={" pl-5 ml-2 " + styles.header__link}>
              <ListIcon type="secondary" />
              <span className="ml-2">Лента заказов</span>
            </li>   
          </ul>
        </nav>
        <div className={styles.header__logo}>
          <Logo />
        </div>
        <div className={styles.header__profile }>
          <ProfileIcon type="secondary" />
          <span className="ml-2 ">Личный кабинет</span>
        </div>
      </div>
    </header>
  );
};
