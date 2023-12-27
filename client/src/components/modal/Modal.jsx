// Modal.jsx
import React from "react";
import Styles from "./modal.module.css";
import Button from "../button/Button"

const { modal, modal_buttons } = Styles;

const Modal = ({ onClose, title, description, onConfirm }) => (
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
);

export default Modal;
