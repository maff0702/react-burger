import { useState, ChangeEvent, MouseEvent, FC } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { History } from 'history';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './auth.module.css';
import './styles.css';

import { requestForgotPassword } from '../../store/authSlice'

interface IFormState {
  email: string;
}

const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const history: History = useHistory();
  const [state, setState] = useState<IFormState>({
    email: '',
  })
  const { isError, forgotStatus } = useSelector((state)=>state.auth);

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
    dispatch(requestForgotPassword(state))
  }
  
  if (localStorage.getItem('accessToken')) {
      return <Redirect to='/' />
  }
  //Нельзя вернуться на предыдущую страницу, если ответ от сервера успешный
  //Ответ от сервера успешен всегда, даже когда поле пустое
  if(forgotStatus){
    return <Redirect to={{pathname: '/reset-password',state: { from: history.location }}} />
  }

  return (
    <div className={styles.auth__container}>
      <div className={styles.auth__form}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <form onSubmit={onSubmit}>
          <Input type={'email'} placeholder={'Укажите e-mail'} onChange={onChange} value={state.email} name={'email'}/>
          <Button type="primary" size="medium">Восстановить</Button>
        </form>
        {isError && <>Ошибка</>}
        <p className={styles.form__text + " mt-20 text text_type_main-default text_color_inactive"}>Вспомнили пароль?
          <Link to='/login'> Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword;
