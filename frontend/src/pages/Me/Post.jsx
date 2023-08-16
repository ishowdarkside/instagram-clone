/* eslint-disable react/prop-types */
import { usePostContext } from "../../context/ActivePost";
import styles from "./Me.module.scss";
export default function Post({ post }) {
  const { dispatch } = usePostContext();

  return (
    <div
      className={styles.postLayer}
      onClick={() => dispatch({ type: "setActivePost", payload: post })}
    >
      <div className={styles.postOverlay}>
        <img src="/heart-fill.svg" alt="likes" />
        {post.likes.length}
      </div>
      <img src={`/${post.images[0]}`} alt="img layer " />
    </div>
  );
}
