import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth.module.css';
import './styles.css';

const ResetPassword = () => {
  const [state, setState] = useState({
    password: '',
    code: ''
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
        <p className="text text_type_main-medium">Вход</p>
        <PasswordInput onChange={onChange} value={state.password} name={'password'} />
        <Input type={'text'} placeholder={'Введите код из письма'} onChange={onChange} value={state.code} name={'code'}/>
        <Button type="primary" size="medium">Сохранить</Button>
        <p className={styles.form__text + " mt-20 text text_type_main-default text_color_inactive"}>Вспомнили пароль?
          <Link to='/login'> Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword;
