import Styles from '@/components/loader/loader.module.css';
import 'ldrs/bouncy';

const Loader = () => {
  return (
    <div className={Styles.loader}>
      <l-bouncy size="45" speed="1.75" color="#ffa07a" />
    </div>
  )
}

export default Loader