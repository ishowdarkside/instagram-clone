/* eslint-disable react/prop-types */
import { usePostContext } from "../../context/ActivePost";
import { AiOutlineMore } from "react-icons/ai";
import styles from "./Postmodal.module.scss";
import { convertDate } from "../../services/convertDate";
import {
  useCommentPost,
  useDeleteComment,
  useGetPost,
} from "../../hooks/usePostActions";
import { useState } from "react";
import { useProtect } from "../../hooks/useProtect";
import Spinner from "../Spinner/Spinner";

export default function PostModalRightPanel() {
  const {
    state: { activePost },
  } = usePostContext();
  const { data, isLoading } = useGetPost(activePost._id);

  if (isLoading) return <Spinner />;
  const { post } = data;

  return (
    <div className={styles.rightPanel}>
      <Creator creator={activePost.creator} />
      <Comments comments={post.comments} />
      <ActionPanel post={post} />
    </div>
  );
}

function Creator({ creator }) {
  return (
    <div className={styles.creatorPanel}>
      <div>
        <img
          src={`http://127.0.0.1:3000/${creator.profilePicture}`}
          alt="profile avatar"
        />
        <span>{creator.username}</span>
      </div>
      <button>
        <AiOutlineMore />
      </button>
    </div>
  );
}

function Comments({ comments }) {
  return (
    <div className={styles.commentsPanel}>
      {comments.map((c) => (
        <Comment comment={c} key={c._id} />
      ))}
    </div>
  );
}

function Comment({ comment }) {
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

  return (
    <div className={styles.comment}>
      {user._id === comment.creator._id && (
        <button className={styles.deleteComment} onClick={handleDeleteComment}>
          <img src="/x-thin.svg" alt="remove " />
        </button>
      )}
      <img
        src={`http://127.0.0.1:3000/${comment.creator.profilePicture}`}
        alt="profile avatar"
      />
      <div>
        <span className={styles.username}>{comment.creator.username}</span>
        <span className={styles.comContent}>{comment.comment}</span>
      </div>
      <p className={styles.comDate}>
        {convertDate(new Date(comment.createdAt))}
      </p>
    </div>
  );
}

function ActionPanel({ post }) {
  const { likes, createdAt, _id } = post;
  const [comm, setComm] = useState("");
  const { mutate } = useCommentPost();

  function handlePostComment() {
    mutate({ postId: _id, comment: comm });
    setComm("");
  }

  return (
    <div className={styles.actionWrapper}>
      <div className={styles.buttonWrapper}>
        <button>
          <img src="/heart-straight-thin.svg" alt="like" />
        </button>
        <button>
          <img src="/chat-circle-thin.svg" alt="comment" />
        </button>
      </div>
      <div>
        <b>{likes.length} likes</b>
        <p>{convertDate(new Date(createdAt))}</p>
      </div>
      <div className={styles.comArea}>
        <textarea
          placeholder="Add a comment..."
          value={comm}
          onChange={(e) => setComm(e.target.value)}
        ></textarea>
        <button onClick={handlePostComment}>Post</button>
      </div>
    </div>
  );
}
