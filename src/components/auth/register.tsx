import { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth.module.css';
import './styles.css';
import { requestRegister } from '../../store/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  }) 
  const { isError } = useSelector((state:any)=>state.auth);

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
    dispatch(requestRegister({state}))
  }
  if (localStorage.getItem('accessToken')) {
    return (
      <Redirect
        to={ history?.location?.state?.from || '/' }
      />
    );
  }

  return (
    <div className={styles.auth__container}>
      <div className={styles.auth__form}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input type={'text'} placeholder={'Имя'} onChange={onChange} value={state.name} name={'name'}/>
        <Input type={'email'} placeholder={'E-mail'} onChange={onChange} value={state.email} name={'email'}/>
        <PasswordInput onChange={onChange} value={state.password} name={'password'} />
        <Button type="primary" size="medium" onClick={handleClick}>Зарегистрироваться</Button>
        {isError && <>Ошибка</>}
        <p className={styles.form__text + " mt-20 text text_type_main-default text_color_inactive"}>Уже зарегистрированы?
          <Link to='/login'> Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;
