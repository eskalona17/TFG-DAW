import './Tabs.css'

const Tabs = ({ setAccountType, accountType }) => {

  return (
    <>
      <ul className="tabs">
        <li
          onClick={() => {
            setAccountType("personal");
          }}
          className={accountType === "personal" ? "active" : ""}
        >Personal</li>
        <li
          onClick={() => {
            setAccountType("profesional");
          }}
          className={accountType === "profesional" ? "active" : ""}
        >Profesional</li>
      </ul>
    </>
  );
};

export default Tabs;
