import { NavLink, Link } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container +' pt-4 pb-4 '+ styles.header__content}>
        <nav className={styles.header__menu}>
          <ul className={styles.header__list}>
            <li className='pr-5'>
              <NavLink 
                exact to="/"
                className={isActive => styles.link + ' ' + (isActive ? styles.link_active : "")}
              >
                <BurgerIcon type="secondary" />
                <span className="ml-2">Конструктор</span>
              </NavLink>
            </li>
            <li className={" pl-5 ml-2 " + styles.header__link}>
              <NavLink 
                to="/feed"
                className={isActive => styles.link + ' ' + (isActive ? styles.link_active : "")}
              >
                <ListIcon type="secondary" />
                <span className="ml-2">Лента заказов</span>
              </NavLink>
            </li>   
          </ul>
        </nav>
        <div className={styles.header__logo}>
          <Link to="/"><Logo /></Link>
        </div>
        <div className={styles.header__profile }>
          <NavLink 
            to="/profile"
            className={isActive => styles.link + ' ' + (isActive ? styles.link_active : "")}
          >
            <ProfileIcon type="secondary" />
            <span className="ml-2 ">Личный кабинет</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
