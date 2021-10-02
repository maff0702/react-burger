import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
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

import { requestCheckAuth } from '../../store/authSlice'
import { requestIngredients } from '../../store/ingredientsSlice';

function App() { 
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { isModalIngredientDetails } = useSelector((state:any) => state.ingredients);
  const { isModalOrder, orderModalTitle } = useSelector((state:any) => state.wsOrders);
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
            title="Детали ингредиента" >
              <IngredientDetails />
          </Modal>
        }/>}
        {background && <Route path={`${background.pathname}/:id`} children={
          <Modal 
            active={isModalOrder}
            title={`#${orderModalTitle}`} >
              <OrderModal />
          </Modal>
        }/>}
      </div>
    </div>
  );
}

export default App;
