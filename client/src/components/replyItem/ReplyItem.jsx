import useUserImage from "../../hooks/useUserImage";
import Styles from "./replyItem.module.css";

const ReplyItem = ({ reply }) => {
  const { userImage } = useUserImage(reply.user, "40");
  const {
    comment,
    comment_user_img_container,
    comment_user_img,
    comment_container,
    comments_text_container,
    comment_user_info,
    comment_user_name,
    comment_text,
  } = Styles;

  return (
    <div className={comment}>
      <div className={comment_user_img_container}>
        <img src={userImage} alt="" className={comment_user_img} />
      </div>
      <div className={comment_container}>
        <div className={comment_user_info}>
          <p className={comment_user_name}>{reply.user.username}</p>
        </div>
        <div className={comments_text_container}>
          <p className={comment_text}>{reply.text}</p>
        </div>
      </div>
    </div>
  );
}

export default ReplyItem