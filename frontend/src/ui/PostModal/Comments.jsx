/* eslint-disable react/prop-types */
import Comment from "./Comment";
import styles from "./Postmodal.module.scss";
export default function Comments({ comments }) {
  return (
    <div className={styles.commentsPanel}>
      {comments.map((c) => (
        <Comment comment={c} key={c._id} />
      ))}
    </div>
  );
}
