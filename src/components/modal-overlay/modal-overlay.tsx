import { FC, ReactNode } from 'react';

import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  readonly active: boolean;
  readonly closeModal: () => void;
  readonly children: ReactNode;
}

const ModalOverlay: FC<IModalOverlayProps> = (props: IModalOverlayProps) => (
  <div 
    className={props.active ? styles.modal+" "+styles.modal_active : styles.active}
    onClick={props.closeModal}
  >
    {props.children} 
  </div>
);

export default ModalOverlay;
