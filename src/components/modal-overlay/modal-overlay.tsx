import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

import { deleteCurrentIngredient } from '../../store/ingredientsSlice';
import { closeModalIngredientDetails } from '../../store/ingredientsSlice';

const ModalOverlay = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const closeModalWinow = () =>{
    if(props.setActive)props.setActive(false);
    dispatch(deleteCurrentIngredient());
    dispatch(closeModalIngredientDetails());
    history.replace({ pathname: '/' });
  }
  
  return (
    <div 
      className={props.active ? styles.modal+" "+styles.modal_active : styles.active}
      onClick={closeModalWinow}
    >
      {props.children} 
    </div>
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func,
  children: PropTypes.element.isRequired
};