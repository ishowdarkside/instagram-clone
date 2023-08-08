import styles from "./Profile.module.scss";
export default function Private() {
  return (
    <div className={styles.isPrivate}>
      <p>This Account is Private</p>
      <p>Follow to see their photos</p>
    </div>
  );
}
