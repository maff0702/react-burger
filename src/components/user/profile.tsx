import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestLogout } from '../../store/authSlice';
import styles from './profile.module.css';
import './styles.css';
import ProfileSettings from './profile-settings';
import Orders from './profile-orders'
import { ProtectedRoute } from '../ProtectedRoute/protected-route';

const Profile = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(requestLogout());
  }

  return (
    <ProtectedRoute path="/profile">
      <Router>
        <div className={styles.profile__container}>
          <div className={styles.profile__menu}>
            <ul className={"text text_type_main-medium text_color_inactive "+styles.menu__list}>
              <li><NavLink exact to='/profile' className={isActive => styles.link + ' ' + (isActive ? styles.link_active : "")}>Профиль</NavLink></li>
              <li><NavLink exact to='/profile/orders' className={isActive => styles.link + ' ' + (isActive ? styles.link_active : "")}>История заказов</NavLink></li>
              <li onClick={handleLogout}>Выход</li>
            </ul>
            <p className="text text_type_main-default text_color_inactive mt-20 ">В этом разделе вы можете изменить свои персональные данные</p>
          </div>
          <div className={styles.profile__content}>
            <Switch>
              <Route exact path="/profile" component={ProfileSettings} />
              <Route exact path="/profile/orders" component={Orders} />
            </Switch>
          </div>
        </div>
      </Router>
    </ProtectedRoute>
  )
}

export default Profile;