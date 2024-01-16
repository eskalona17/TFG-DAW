import Styles from '@/components/searchResult/searchResult.module.css';
import useUserImage from '@/hooks/useUserImage';

const SearchResult = ({ item, handleSearchResultClick }) => {
  const { userImage } = useUserImage(item.user, '75');

  return (
    <li onClick={() => handleSearchResultClick(item.user.username)} className={Styles.search_result}>
      <img
        src={userImage}
        alt=""
        className={Styles.search_results_img}
      />
      <span>{item.user.username}</span>
    </li>
  )
}

export default SearchResult