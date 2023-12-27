/* import { VscListFilter } from "react-icons/vsc"; */
import Styles from "./filterButton.module.css";
const FilterButton = ({ filter, activeFilter, handleSearchClick }) => {
  const {
    search_button,
    active
} = Styles;
  const isActive = activeFilter === filter;
  return (
    <button
      className={`${search_button} ${isActive ? active : ''}`}
      onClick={() => handleSearchClick(filter)}
    >
      {/* {isActive && <VscListFilter />} */}
      {filter}
    </button>
  );
};

export default FilterButton