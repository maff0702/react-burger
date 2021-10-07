import { useEffect, FC, ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { History } from 'history';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("modals");

interface IModalProps {
  readonly active: boolean;
  readonly setActive: ActionCreatorWithoutPayload<string> | null;
  title?: string;
  readonly children: ReactNode;
}

const Modal: FC<IModalProps> = ({active, setActive, title, children}) => {
  const dispatch = useDispatch();
  const history: History = useHistory();
  const location = useLocation<{background:{pathname: string}}>();
  const isLoadingOrderDetails = useSelector((state)=>state.constructors.order.isLoading);
  
  if(isLoadingOrderDetails) setActive = null;
  
  const closeModal = () => {
    if(setActive) dispatch(setActive());

    history.replace({
      pathname: location?.state
      ? `${location?.state?.background?.pathname}`
      : '/'
    });
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
      closeModal={closeModal}
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
