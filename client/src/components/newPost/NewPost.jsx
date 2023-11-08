import Styles from './newPost.module.css'

const NewPost = () => {
  return (
    <div className={Styles.newPost}>
      <img src="" alt="" className={Styles.user_img} />
      <form>
        <input type="text" placeholder='¿Qué estás pensando?' />
        <button>i</button>
      </form>
    </div>
  )
}

export default NewPost