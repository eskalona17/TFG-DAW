import Styles from "./searchFilter.module.css";
import { useState } from "react";
import FilterButton from "../FilterButton/FilterButton";
import usePosts from "../../hooks/getPost";

const SearchFilter = () => {
    const {
        searchFilter,
        searchFilter_container
    } = Styles;

    const [activeFilter, setActiveFilter] = useState('Todo');
    const filters = ['Todo', 'Personal', 'Profesional'];
    

    const handleSearchClick = (filter) => {
        if (filter !== activeFilter) {
          setActiveFilter(filter);
        }
      };
    usePosts(activeFilter);
    return (
        <div className={searchFilter}>
            <div className={searchFilter_container}>
                {filters.map((filter) => (
                    <FilterButton
                        key={filter}
                        filter={filter}
                        activeFilter={activeFilter}
                        handleSearchClick={() => handleSearchClick(filter)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchFilter;