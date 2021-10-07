import { useDispatch, useSelector } from '../../hooks/hooks';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { History } from 'history';
import { useEffect } from 'react';

import styles from './app.module.css';
import Header from '../app-header/app-header';
import Main from '../../pages/main/main';
import Login from '../../pages/auth/login';
import Register from '../../pages/auth/register';
import ForgotPassword from '../../pages/auth/forgot-password';
import ResetPassword from '../../pages/auth/reset-password';
import Profile from '../../pages/user/profile';
import Ingredient from '../../pages/ingredient-page/ingredient';
import Feed from '../../pages/feed/feed';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Order from '../../pages/order-page/order';
import OrderModal from '../order-modal/order-modal';
import NotFound from '../../pages/not-found/not-fount';
import { TLocationHook } from '../../types/types';

import { requestCheckAuth } from '../../store/authSlice'
import { requestIngredients, closeModalIngredientDetails } from '../../store/ingredientsSlice';
import { orderModalClose } from '../../store/wsOrdersSlice';

function App() { 
  const dispatch = useDispatch();
  const location = useLocation<{ background: TLocationHook }>();
  const history: History = useHistory();

  const { isModalIngredientDetails } = useSelector((state) => state.ingredients);
  const { isModalOrder, orderModalTitle } = useSelector((state) => state.wsOrders);
  const background = history.action === 'PUSH' && location.state && location.state.background;
  
  useEffect(()=>{
    if(localStorage.getItem('accessToken')) dispatch(requestCheckAuth());
    dispatch(requestIngredients());
  },[dispatch]);
  
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <Switch location={background || location}>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/feed/:id" component={Order} />
          <Route exact path="/ingredients/:id" component={Ingredient} />
          <Route component={NotFound} />
        </Switch>
        {background && <Route path="/ingredients/:id" children={
          <Modal 
            active={isModalIngredientDetails}
            setActive={closeModalIngredientDetails}
            title="Детали ингредиента" >
              <IngredientDetails />
          </Modal>
        }/>}
        {background && <Route path={`${background.pathname}/:id`} children={
          <Modal 
            active={isModalOrder}
            setActive={orderModalClose}
            title={`#${orderModalTitle}`} >
              <OrderModal />
          </Modal>
        }/>}
      </div>
    </div>
  );
}

export default App;
