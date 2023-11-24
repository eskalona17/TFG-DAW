import Styles from "./searchFilter.module.css";
import { useState } from "react";
import { VscListFilter } from "react-icons/vsc";
const SearchFilter = () => {
    const {
        searchFilter,
        searchFilter_container,
        search_button,
        active
    } = Styles;

    const [filterSearch, setFilterSearch] = useState('Todo');

    const renderIcon = (filter) => {
        return filter === filterSearch ? <VscListFilter /> : null;
    };

    const handleSearchClick = (filter) => {
        console.log("buscando en", filter);
        setFilterSearch(filter === filterSearch ? null : filter);
    };
     
    return (
        <div className={searchFilter}>
            <div className={searchFilter_container}>
                <button
                    className={`${search_button} ${filterSearch === 'Todo' ? active : ''}`}
                    onClick={() => handleSearchClick('Todo')}
                >
                    {renderIcon('Todo')}
                    Todo
                </button>
                <button
                    className={`${search_button} ${filterSearch === 'Personal' ? active : ''}`}
                    onClick={() => handleSearchClick('Personal')}
                >   
                    {renderIcon('Personal')}
                    Personal
                </button>
                <button
                    className={`${search_button} ${filterSearch === 'Profesional' ? active : ''}`}
                    onClick={() => handleSearchClick('Profesional')}
                >
                    {renderIcon('Profesional')}
                    Profesional
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;