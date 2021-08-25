import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modals");

const ModalOverlay = Component => ({active, setActive, info, title}) => {   
  const closeModal = ({key}: KeyboardEvent) => {
    if (key === "Escape" ) setActive(false);
    document.removeEventListener('keydown', closeModal);
  }
  document.addEventListener('keydown', closeModal);

  return (active && modalRoot ? ReactDOM.createPortal(
    (<div className={active ? styles.modal+" "+styles.modal_active : styles.active}onClick={() => setActive(false)}>
      <Component 
        active={active}
        setActive={setActive}
        info={info}
        title={title}
      /> 
    </div>
    ), modalRoot) : null);
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  info: PropTypes.any.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};