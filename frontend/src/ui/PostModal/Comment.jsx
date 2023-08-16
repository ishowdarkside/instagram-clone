import { usePostContext } from "../../context/ActivePost";
import { useDeleteComment } from "../../hooks/usePostActions";
import { useProtect } from "../../hooks/useProtect";
import { convertDate } from "../../services/convertDate";
import { useNavigate } from "react-router-dom";
import styles from "./Postmodal.module.scss";
/* eslint-disable react/prop-types */
export default function Comment({ comment }) {
  const {
    data: { user },
  } = useProtect();

  const {
    state: { activePost },
  } = usePostContext();
  const { mutate } = useDeleteComment();
  function handleDeleteComment() {
    mutate({ postId: activePost._id, commentId: comment._id });
  }
  const navigate = useNavigate();
  const { dispatch } = usePostContext();
  return (
    <div className={styles.comment}>
      {user._id === comment.creator._id && (
        <button className={styles.deleteComment} onClick={handleDeleteComment}>
          <img src="/x-thin.svg" alt="remove " />
        </button>
      )}
      <img
        src={`/${comment.creator.profilePicture}`}
        alt="profile avatar"
        onClick={() => {
          dispatch({ type: "reset" });
          navigate(`/app/profile/${comment.creator._id}`);
        }}
      />
      <div>
        <span
          className={styles.username}
          onClick={() => {
            dispatch({ type: "reset" });
            navigate(`/app/profile/${comment.creator._id}`);
          }}
        >
          {comment.creator.username}
        </span>
        <span className={styles.comContent}>{comment.comment}</span>
      </div>
      <p className={styles.comDate}>
        {convertDate(new Date(comment.createdAt))}
      </p>
    </div>
  );
}
