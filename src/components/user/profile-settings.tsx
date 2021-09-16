import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import './styles.css';
import { requestRegister } from '../../store/authSlice';

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
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
    dispatch(requestRegister({state}))
  }
  const onIconClick = () => {}

  return (
    <div className={styles.profile__form}>
      <Input icon='EditIcon' onIconClick={onIconClick} type={'text'} placeholder={'Имя'} onChange={onChange} value={state.name} name={'name'}/>
      <Input icon='EditIcon' onIconClick={onIconClick} type={'email'} placeholder={'Логин'} onChange={onChange} value={state.email} name={'email'}/>
      <Input icon='EditIcon' onIconClick={onIconClick} type={'password'} placeholder={'Пароль'} onChange={onChange} value={state.password} name={'password'}/>
    </div>
  )
}

export default ProfileSettings;
