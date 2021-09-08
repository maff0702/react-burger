import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


const ModalOverlay = (props) => {   
  const closeModal = ({key}: KeyboardEvent) => {
    if (key === "Escape" ) props.setActive(false);
  }
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  })

  return (
    <div className={props.active ? styles.modal+" "+styles.modal_active : styles.active}onClick={() => props.setActive(false)}>
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