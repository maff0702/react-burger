import { FC, ReactNode } from 'react';

import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  readonly active: boolean;
  readonly closeModal: () => void;
  readonly children: ReactNode;
}

const ModalOverlay: FC<IModalOverlayProps> = ({active, closeModal, children}) => (
  <div 
    className={active ? styles.modal+" "+styles.modal_active : styles.active}
    onClick={closeModal}
  >
    {children} 
  </div>
);

export default ModalOverlay;
