import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import './styles.css';
import { requestUpdateUser } from '../../store/authSlice';

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state:any)=>state.auth);
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })

  useEffect(()=>{
    if(isAuth){
      setState({
        ...state,
        name: user.name,
        email: user.email
      })
  }
  },[user])

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
    dispatch(requestUpdateUser({state}))
  }
  const handleClickCancel = () => {
    setState({
      ...state,
      name: user.name,
      email: user.email
    })
  }

  return (
    <div className={styles.profile__form}>
      <Input icon='EditIcon' onIconClick={handleClick} type={'text'} placeholder={'Имя'} onChange={onChange} value={state.name} name={'name'}/>
      <Input icon='EditIcon' onIconClick={handleClick} type={'email'} placeholder={'Логин'} onChange={onChange} value={state.email} name={'email'}/>
      <Input icon='EditIcon' type={'password'} placeholder={'Пароль'} onChange={onChange} value={state.password} name={'password'}/>
      <span>
        <span><Button onClick={handleClickCancel} type="primary" size="medium">Отменить изменения</Button></span>
        <span className='ml-10'><Button onClick={handleClick} type="primary" size="medium">Сохранить</Button></span>
      </span>
    </div>
  )
}

export default ProfileSettings;
