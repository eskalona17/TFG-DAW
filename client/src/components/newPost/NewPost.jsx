import Styles from './newPost.module.css'

const NewPost = () => {
  return (
    <div className={Styles.newPost}>
      <div className={Styles.newPost_container}>
        <img src="" alt="" className={Styles.user_img} />
        <form className={Styles.newPost_form}>
          <input type="text" placeholder='¿Qué estás pensando?' className={Styles.newPost_input} />
          <button className={Styles.newPost_button}>i</button>
        </form>
      </div>
    </div>
  )
}

export default NewPost