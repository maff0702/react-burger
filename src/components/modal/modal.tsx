import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Modal = Component => ({active, setActive, info, title}) => {
  console.log();
  
  return (
      <div className={active ? styles.modal__body+" "+styles.modal__body_active : styles.modal__body} onClick={e=>e.stopPropagation()}>
        <div className={"text text_type_main-large "+styles.header}>{title}</div>
        <span className={styles.modal__close}>
          <CloseIcon type="primary" onClick={() => setActive(false)}/>
        </span>
        <Component info={info}/>
      </div>
  )
}

export default Modal;

Modal.propTypes = {
  info: PropTypes.any.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};
