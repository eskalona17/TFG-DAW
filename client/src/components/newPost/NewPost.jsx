import Styles from "./newPost.module.css";
import { VscSend } from "react-icons/vsc";

const NewPost = () => {
  const {
    newPost,
    newPost_container,
    user_img,
    newPost_form,
    newPost_input,
    newPost_button,
  } = Styles;

  const orange_color = "#ffa07a";
  
  return (
    <div className={newPost}>
      <div className={newPost_container}>
        <img src="" alt="" className={user_img} />
        <form className={newPost_form}>
          <input
            type="text"
            placeholder="¿Qué estás pensando?"
            className={newPost_input}
          />
          <button className={newPost_button}>
            <VscSend color={orange_color} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
