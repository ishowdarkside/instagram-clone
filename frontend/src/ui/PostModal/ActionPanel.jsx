/* eslint-disable react/prop-types */
import { useState } from "react";
import { useCommentPost, useLikePost } from "../../hooks/usePostActions";
import styles from "./Postmodal.module.scss";
import { convertDate } from "../../services/convertDate";
import { useProtect } from "../../hooks/useProtect";

export default function ActionPanel({ post }) {
  const { likes, createdAt, _id } = post;
  const [comm, setComm] = useState("");
  const { mutate: commentPost } = useCommentPost();
  const { mutate: likePost } = useLikePost();
  const {
    data: { user },
  } = useProtect();

  function handlePostComment(e) {
    e.preventDefault();
    commentPost({ postId: _id, comment: comm });
    setComm("");
  }

  return (
    <div className={styles.actionWrapper}>
      <div className={styles.buttonWrapper}>
        <button onClick={() => likePost(_id)}>
          <img
            src={`/heart-straight-${
              likes.includes(user._id) ? "fill" : "thin"
            }.svg`}
            alt="like"
          />
        </button>
        <button onClick={() => document.querySelector("input").focus()}>
          <img src="/chat-circle-thin.svg" alt="comment" />
        </button>
      </div>
      <div>
        <b>{likes.length} likes</b>
        <p>{convertDate(new Date(createdAt))}</p>
      </div>
      <form className={styles.comArea} onSubmit={(e) => handlePostComment(e)}>
        <input
          placeholder="Add a comment..."
          value={comm}
          onChange={(e) => setComm(e.target.value)}
        ></input>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
