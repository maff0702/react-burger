import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

import { deleteCurrentIngredient } from '../../store/ingredientsSlice';
import { closeModalIngredientDetails } from '../../store/ingredientsSlice';

const modalRoot = document.getElementById("modals");

const Modal = ({active, setActive, title, children}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoadingOrderDetails = useSelector((state:any)=>state.constructors.order.isLoading);
  
  if(isLoadingOrderDetails) setActive=null;
  const closeModal = () => {
    if(setActive)setActive(false);
    dispatch(deleteCurrentIngredient());
    dispatch(closeModalIngredientDetails());
    history.replace({ pathname: '/' });
  }
  const closeModalEsc = ({key}: KeyboardEvent) => {
    if (key === "Escape" ) closeModal();
  }
  useEffect(() => {
    document.addEventListener('keydown', closeModalEsc);
    return () => document.removeEventListener('keydown', closeModalEsc);
  })

  return (active && modalRoot ? ReactDOM.createPortal(
    (
    <ModalOverlay
      active={active}
      setActive={setActive}
    >
      <div className={active ? styles.modal__body+" "+styles.modal__body_active : styles.modal__body} onClick={e=>e.stopPropagation()}>
        <div className={"text text_type_main-large "+styles.header}>{title}</div>
        <span className={styles.modal__close}>
          <CloseIcon type="primary" onClick={closeModal}/>
        </span>
        {children}
      </div>
    </ModalOverlay>
    ),
  modalRoot) : null);
}

export default Modal;

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};
