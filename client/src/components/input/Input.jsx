import "./Input.css";

export const Input = ({ type, label, name }) => {
  return (
    <div className="input-container">
      {/* {icon && <i className={icon}></i>} */}
      <input type={type ? type : "text"} name={name} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
