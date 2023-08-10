/* eslint-disable react/prop-types */
import { usePostContext } from "../../context/ActivePost";
import Comment from "./Comment";
import styles from "./Postmodal.module.scss";
export default function Comments({ comments }) {
  const {
    state: { activePost },
  } = usePostContext();
  console.log(activePost);
  return (
    <div className={styles.commentsPanel}>
      <div className={styles.comment}>
        <img
          src={`http://127.0.0.1:3000/${activePost.creator.profilePicture}`}
          alt="profile avatar"
        />
        <div>
          <span className={styles.username}>{activePost.creator.username}</span>
          <span className={styles.comContent}>{activePost.description}</span>
        </div>
      </div>
      {comments.map((c) => (
        <Comment comment={c} key={c._id} />
      ))}
    </div>
  );
}
