/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import { useProtect } from "../../hooks/useProtect";
import { usePostContext } from "../../context/ActivePost";
import { useLikePost } from "../../hooks/usePostActions";
import { useState } from "react";
import ImageSlider from "../../ui/Slider/ImageSlider";
export default function FeedPost({ post }) {
  const { mutate: likePost } = useLikePost();
  const [hasLiked, setHasLiked] = useState(false);
  function handleLike() {
    setHasLiked(true);
    likePost(post._id, {});
    setTimeout(() => {
      setHasLiked(false);
    }, 1000);
  }
  return (
    <div className={styles.postContainer}>
      <UserInfo creator={post.creator} />
      {hasLiked && (
        <img src="/heart-fill.svg" alt="heart" className={styles.tempLike} />
      )}
      <ImageSlider>
        {post.images.map((i) => (
          <Image imgSrc={i} key={i} onDoubleClick={handleLike} />
        ))}
      </ImageSlider>
      <ActionaPanel post={post} />
    </div>
  );
}

function Image({ imgSrc, onDoubleClick }) {
  return (
    <div>
      <img src={`/${imgSrc}`} alt="post" onDoubleClick={onDoubleClick} />
    </div>
  );
}

function UserInfo({ creator }) {
  return (
    <div className={styles.userInfo}>
      <Link to={`/app/profile/${creator._id}`}>
        <img src={`/${creator.profilePicture}`} alt="avatar" />
        <span>{creator.username}</span>
      </Link>
    </div>
  );
}

function ActionaPanel({ post }) {
  const { dispatch } = usePostContext();

  const { mutate: likePost } = useLikePost();
  const {
    data: { user },
    isLoading,
  } = useProtect();

  function handleLike() {
    likePost(post._id, {});
  }
  if (isLoading) return null;
  return (
    <div className={styles.actionPanel}>
      <div className={styles.buttonWrapper}>
        <button onClick={handleLike}>
          <img
            src={`/heart-straight-${
              post.likes.includes(user._id) ? "fill" : "thin"
            }.svg`}
            alt="like"
          />
        </button>
        <button
          onClick={() => dispatch({ type: "setActivePost", payload: post })}
        >
          <img src="/chat-circle-thin.svg" alt="comment" />
        </button>
      </div>
      {post.description && (
        <span>
          <b>{post.creator.username} </b>
          {post.description}
        </span>
      )}
      <span
        className={styles.viewComments}
        onClick={() => dispatch({ type: "setActivePost", payload: post })}
      >
        {post.comments.length === 0
          ? "Write a comment"
          : `View all ${post.comments.length} comments`}
      </span>
    </div>
  );
}
