import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { deleteCurrentIngredient } from '../../store/ingredientsSlice';

const modalRoot = document.getElementById("modals");

const Modal = (props) => {
  const dispatch = useDispatch();
  return (props.active && modalRoot ? ReactDOM.createPortal(
    (
    <ModalOverlay
      active={props.active}
      setActive={props.setActive}
    >
      <div className={props.active ? styles.modal__body+" "+styles.modal__body_active : styles.modal__body} onClick={e=>e.stopPropagation()}>
        <div className={"text text_type_main-large "+styles.header}>{props.title}</div>
        <span className={styles.modal__close}>
          <CloseIcon type="primary" onClick={() => {props.setActive(false);dispatch(deleteCurrentIngredient())}}/>
        </span>
        {props.children}
      </div>
    </ModalOverlay>
    ),
  modalRoot) : null);
}

export default Modal;

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};
