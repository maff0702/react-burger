import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './app.module.css';
import Header from '../app-header/app-header';
import Main from '../main/main';
import Login from '../auth/login';
import Register from '../auth/register';
import ForgotPassword from '../auth/forgot-password';
import ResetPassword from '../auth/reset-password';
import Profile from '../user/profile';

import { requestCheckAuth } from '../../store/authSlice'

function App() { 
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem('accessToken')) dispatch(requestCheckAuth())
  },[dispatch]);
  return (
    <Router>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
