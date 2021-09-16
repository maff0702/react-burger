import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth.module.css';
import './styles.css';

const ForgotPassword = () => {
  const [state, setState] = useState({
    email: '',
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

  return (
    <div className={styles.auth__container}>
      <div className={styles.auth__form}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input type={'email'} placeholder={'Укажите e-mail'} onChange={onChange} value={state.email} name={'email'}/>
        <Button type="primary" size="medium">Восстановить </Button>
        <p className={styles.form__text + " mt-20 text text_type_main-default text_color_inactive"}>Вспомнили пароль?
          <Link to='/login'> Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword;
