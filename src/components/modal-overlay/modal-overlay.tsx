import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

const ModalOverlay = (props) => (
  <div 
    className={props.active ? styles.modal+" "+styles.modal_active : styles.active}
    onClick={props.closeModal}
  >
    {props.children} 
  </div>
);

export default ModalOverlay;

ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
  children: PropTypes.element.isRequired
};