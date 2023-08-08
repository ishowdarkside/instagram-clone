import styles from "./Profile.module.scss";
export default function PostNotFound() {
  return (
    <div className={styles.noPosts}>
      <img src="/notfound.svg" alt="notfound" />
      <span>No posts found</span>
    </div>
  );
}
