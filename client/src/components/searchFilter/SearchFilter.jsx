import Styles from '@/components/searchFilter/searchFilter.module.css';
import FilterButton from '@/components/FilterButton/FilterButton';
import { PostContext } from '@/context/PostContext';
import { useContext, useState } from 'react';

const SearchFilter = () => {
    const { filterPostByFilter, handleFilterChange } = useContext(PostContext);
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
        if (filter === 'Personal') {
            filterPostByFilter('personal');
            handleFilterChange('personal');
        } else if (filter === 'Profesional') {
            filterPostByFilter('profesional');
            handleFilterChange('profesional');
        } else {
            filterPostByFilter('all');
            handleFilterChange('all');
          }
    };
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