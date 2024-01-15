import Styles from "./modal.module.css";
import Button from "@/button/Button"

const { backdrop, modal, modal_buttons } = Styles;

const Modal = ({ onClose, title, description, onConfirm }) => (
  <>
    <div className={backdrop} onClick={onClose}></div>
    <div className={modal}>
      <span>
        <strong>{title}</strong>
      </span>
      <small>{description}</small>
      <div className={modal_buttons}>
        <Button onClick={onConfirm} text="Aceptar" variant="secondary" />
        <Button onClick={onClose} text="Volver" variant="primary" />
      </div>
    </div>
  </>
);

export default Modal;
