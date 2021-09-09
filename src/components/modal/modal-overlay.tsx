import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCurrentIngredient } from '../../store/ingredientsSlice';

const ModalOverlay = (props) => {  
  const dispatch = useDispatch(); 
  const closeModal = ({key}: KeyboardEvent) => {
    if (key === "Escape" ) {
      props.setActive(false);
      dispatch(deleteCurrentIngredient())
    };
  }
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  })

  return (
    <div className={props.active ? styles.modal+" "+styles.modal_active : styles.active}
      onClick={() => {props.setActive(false); dispatch(deleteCurrentIngredient())}}>
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