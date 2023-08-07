import { usePostContext } from "../../context/ActivePost";
import PostModalRightPanel from "./PostModalRightPanel";
import styles from "./Postmodal.module.scss";
export default function PostModal() {
  const {
    state: { activePost },
  } = usePostContext();

  return (
    <div className={styles.postModal}>
      <div className={styles.imgWrapper}>
        <img
          src={`http://127.0.0.1:3000/${activePost.images[0]}`}
          alt="post img"
        />
      </div>
      <PostModalRightPanel />
    </div>
  );
}
