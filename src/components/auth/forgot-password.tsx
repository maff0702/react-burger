import { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth.module.css';
import './styles.css';
import { requestForgotPassword } from '../../store/authSlice'

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
  })
  const { isError, forgotStatus } = useSelector((state:any)=>state.auth);

  const onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value
    });
  }

  const handleClick = () => {
    dispatch(requestForgotPassword(state))
  }
  
  if (localStorage.getItem('accessToken')) {
      return <Redirect to='/' />
  }
  //Нельзя вернуться на предыдущую страницу, если ответ от сервера успешный
  if(forgotStatus){
    return <Redirect to={{pathname: '/reset-password',state: { from: history.location }}} />
  }

  return (
    <div className={styles.auth__container}>
      <div className={styles.auth__form}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input type={'email'} placeholder={'Укажите e-mail'} onChange={onChange} value={state.email} name={'email'}/>
        <Button onClick={handleClick} type="primary" size="medium">Восстановить</Button>
        {isError && <>Ошибка</>}
        <p className={styles.form__text + " mt-20 text text_type_main-default text_color_inactive"}>Вспомнили пароль?
          <Link to='/login'> Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword;
