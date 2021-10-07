import { useState, MouseEvent, ChangeEvent, FC } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './auth.module.css';
import './styles.css';

import { requestLogin } from '../../store/authSlice';

interface IFormState {
  email: string;
  password: string;
}

const Login: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<{ from: {pathname?: string} }>();
  const [state, setState] = useState<IFormState>({
    email: '',
    password: ''
  });
  const { isError } = useSelector((state)=>state.auth);

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
    dispatch(requestLogin({state}));
  }
  
  if (localStorage.getItem('accessToken')) {
      return (
        <Redirect
          to={ location?.state?.from || '/' }
        />
    );
  }

  return (
    <div className={styles.auth__container}>
      <div className={styles.auth__form}>
        <p className="text text_type_main-medium">Вход</p>
        <form onSubmit={onSubmit}>
          <Input type={'email'} placeholder={'E-mail'} onChange={onChange} value={state.email} name={'email'}/>
          <PasswordInput onChange={onChange} value={state.password} name={'password'} />
          <Button type="primary" size="medium">Войти</Button>
        </form>
        {isError && <>Ошибка</>}
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
