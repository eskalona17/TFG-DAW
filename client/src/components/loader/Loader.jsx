import 'ldrs/bouncy'
import Styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={Styles.loader}>
      <l-bouncy size="45" speed="1.75" color="#ffa07a" />
    </div>
  )
}

export default Loader