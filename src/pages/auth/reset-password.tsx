import { useState, ChangeEvent, MouseEvent, FC } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './auth.module.css';
import './styles.css';

import { requestResetPassword } from '../../store/authSlice';

interface IFormState {
  password: string;
  token: string;
}

const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<{ from: {pathname?: string} }>();
  const [state, setState] = useState<IFormState>({
    password: '',
    token: ''
  });
  const { isError, resetStatus } = useSelector((state)=>state.auth);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value
    });
  }
  
  const onSubmit = (e: MouseEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(requestResetPassword(state))
  }

  if(resetStatus) return <Redirect to='/login' />

  if (location.state?.from?.pathname !== "/forgot-password") return <Redirect to='/' />

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
