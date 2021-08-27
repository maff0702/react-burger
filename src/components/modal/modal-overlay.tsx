import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.getElementById("modals");

const ModalOverlay = (props) => {   
  const closeModal = ({key}: KeyboardEvent) => {
    if (key === "Escape" ) props.setActive(false);
  }
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  })

  return (props.active && modalRoot ? ReactDOM.createPortal(
    (<div className={props.active ? styles.modal+" "+styles.modal_active : styles.active}onClick={() => props.setActive(false)}>
      {props.children} 
    </div>
    ), modalRoot) : null);
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};