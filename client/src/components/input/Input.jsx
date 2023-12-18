import Styles from './input.module.css'
import { VscSend } from "react-icons/vsc";

const Input = ({ type, value, placeholder, onClick, onChange, newPost }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <form className={Styles.form} onSubmit={handleSubmit}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${Styles.input} ${newPost ? Styles.newPost : ''}`}
      />
      {onClick &&
        <button type ="submit" className={Styles.button}>
        <VscSend className={Styles.icon} />
      </button>}
    </form>
  )
}

export default Input