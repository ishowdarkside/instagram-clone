/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useCommentPost, useLikePost } from "../../hooks/usePostActions";
import styles from "./Postmodal.module.scss";
import { convertDate } from "../../services/convertDate";
import { useProtect } from "../../hooks/useProtect";
import { useQueryClient } from "@tanstack/react-query";

export default function ActionPanel({ post }) {
  const queryClient = useQueryClient();
  const inputRef = useRef(null);
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

  function handleLikePost() {
    likePost(_id, {
      onSuccess: () => {
        console.log(post.creator, user._id);
        if (post.creator === user._id) queryClient.invalidateQueries(["user"]);
      },
    });
  }
  return (
    <div className={styles.actionWrapper}>
      <div className={styles.buttonWrapper}>
        <button onClick={handleLikePost}>
          <img
            src={`/heart-straight-${
              likes.includes(user._id) ? "fill" : "thin"
            }.svg`}
            alt="like"
          />
        </button>
        <button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
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
          ref={inputRef}
          onChange={(e) => setComm(e.target.value)}
        ></input>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
