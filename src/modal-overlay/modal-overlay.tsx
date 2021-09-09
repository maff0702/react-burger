import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { deleteCurrentIngredient } from '../store/ingredientsSlice';
import { useDispatch } from 'react-redux';

const ModalOverlay = (props) => {
  const dispatch = useDispatch();
  const closeModals = () =>{
    props.setActive(false);
    dispatch(deleteCurrentIngredient());
  }
  const closeModal = ({key}: KeyboardEvent) => {
    if (key === "Escape" ) closeModals();
  }
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  })
  
  return (
    <div 
      className={props.active ? styles.modal+" "+styles.modal_active : styles.active}
      onClick={closeModals}
    >
      {props.children} 
    </div>
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};