import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth.module.css';
import './styles.css';
import { requestLogin } from '../../store/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: ''
})
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
    dispatch(requestLogin({state}))
  }

  return (
    <div className={styles.auth__container}>
      <div className={styles.auth__form}>
        <p className="text text_type_main-medium">Вход</p>
        <Input type={'email'} placeholder={'E-mail'} onChange={onChange} value={state.email} name={'email'}/>
        <PasswordInput onChange={onChange} value={state.password} name={'password'} />
        <Button onClick={handleClick} type="primary" size="medium">Войти</Button>
        <p className={styles.form__text + " mt-20 text text_type_main-default text_color_inactive"}>Вы - новый пользователь?
          <Link to='/register'> Зарегистрироваться</Link>
        </p>
        <p className={styles.form__text + " mt-4 text text_type_main-default text_color_inactive"}>Забыли пароль?
          <Link to='/forgot-password'> Восстановить пароль</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
