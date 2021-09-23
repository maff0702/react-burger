import { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './auth.module.css';
import './styles.css';

import { requestResetPassword } from '../../store/authSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    password: '',
    token: ''
  })
  const { isError, resetStatus } = useSelector((state:any)=>state.auth);

  const onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value
    });
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(requestResetPassword(state))
  }
  if(resetStatus) return <Redirect to='/login' />

  if (history.location.state?.from?.pathname !== "/forgot-password") return <Redirect to='/' />

  return (
    <div className={styles.auth__container}>
      <div className={styles.auth__form}>
        <p className="text text_type_main-medium">Вход</p>
        <form onSubmit={onSubmit}>
          <PasswordInput onChange={onChange} value={state.password} name={'password'} />
          <Input type={'text'} placeholder={'Введите код из письма'} onChange={onChange} value={state.token} name={'token'}/>
          <Button type="primary" size="medium">Сохранить</Button>
        </form>
        {isError && <>Ошибка</>}
        <p className={styles.form__text + " mt-20 text text_type_main-default text_color_inactive"}>Вспомнили пароль?
          <Link to='/login'> Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword;
