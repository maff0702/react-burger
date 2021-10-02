import { Switch, Route, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile.module.css';
import './styles.css';
import ProfileSettings from './profile-settings';
import Orders from '../profile-orders/profile-orders'
import Order from '../order-page/order';
import Modal from '../../components/modal/modal';
import { ProtectedRoute } from '../../components/protected-route/protected-route';
import OrderModal from '../../components/order-modal/order-modal';

import { requestLogout } from '../../store/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { isModalOrder, orderModalTitle } = useSelector((state:any) => state.wsOrders);
  const background = history.action === 'PUSH' && location.state && location.state.background;

  const handleLogout = () => {
    dispatch(requestLogout());
  }
  
  return (
    <ProtectedRoute path="/profile">
      <div className={styles.profile__container}>
        <div className={styles.profile__menu}>
          <ul className={"text text_type_main-medium text_color_inactive "+styles.menu__list}>
            <li><NavLink exact to='/profile' className={isActive => styles.link + ' ' + (isActive ? styles.link_active : "")}>Профиль</NavLink></li>
            <li><NavLink to='/profile/orders' className={isActive => styles.link + ' ' + (isActive ? styles.link_active : "")}>История заказов</NavLink></li>
            <li onClick={handleLogout}>Выход</li>
          </ul>
          <p className="text text_type_main-default text_color_inactive mt-20 ">В этом разделе вы можете изменить свои персональные данные</p>
        </div>
        <div className={styles.profile__content}>
          <Switch location={background || location}>
            <Route exact path="/profile" component={ProfileSettings} />
            <Route exact path="/profile/orders" component={Orders} />
            <Route exact path="/profile/orders/:id" component={Order} />
          </Switch>
          {background && <Route path="/profile/orders/:id" children={
            <Modal 
              active={isModalOrder}
              title={`#${orderModalTitle}`} >
                <OrderModal />
            </Modal>} 
          />}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Profile;
