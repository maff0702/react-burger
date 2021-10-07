import { useState, useEffect, FC, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';
import './styles.css';

import { requestUpdateUser } from '../../store/authSlice';

interface IFormState {
  name: string;
  email: string;
  password: string;
}

const ProfileSettings: FC = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: any) => state.auth);
  const [state, setState] = useState<IFormState>({
    name: '',
    email: '',
    password: ''
  });

  useEffect(()=>{
    if(isAuth){
      setState({
        ...state,
        name: user.name,
        email: user.email
      })
  }
  },[user]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value
    });
  }
  const onSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    dispatch(requestUpdateUser({state}))
  };

  const handleClickCancel = (e: SyntheticEvent): void => {
    e.preventDefault();
    setState({
      ...state,
      name: user.name,
      email: user.email
    })
  };

  return (
    <div className={styles.profile__form}>
      <form onSubmit={onSubmit}>
        <Input icon='EditIcon' onIconClick={onSubmit} type={'text'} placeholder={'Имя'} onChange={onChange} value={state.name} name={'name'}/>
        <Input icon='EditIcon' onIconClick={onSubmit} type={'email'} placeholder={'Логин'} onChange={onChange} value={state.email} name={'email'}/>
        <Input icon='EditIcon' type={'password'} placeholder={'Пароль'} onChange={onChange} value={state.password} name={'password'}/>
        <span className={styles.button__group}>
          <Button type="primary" size="medium">Сохранить</Button>
          <Button onClick={handleClickCancel} type="primary" size="medium">Отменить изменения</Button>
        </span>
      </form>
    </div>
  )
}

export default ProfileSettings;
