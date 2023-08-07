import { useProtect } from "../../hooks/useProtect";
import styles from "./Me.module.scss";
import Post from "./Post";
export default function Posts() {
  const {
    data: { user },
  } = useProtect();
  return (
    <div className={styles.postWrapper}>
      {user.posts.length === 0 && (
        <div className={styles.noPosts}>
          <img src="/notfound.svg" alt="notfound" />
          <span>No posts found</span>
        </div>
      )}

      {user.posts.length > 0 &&
        user.posts.map((p) => <Post post={p} key={p._id} />)}
    </div>
  );
}
