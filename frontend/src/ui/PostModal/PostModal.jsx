import { usePostContext } from "../../context/ActivePost";
import { useLikePost } from "../../hooks/usePostActions";
import PostModalRightPanel from "./PostModalRightPanel";
import styles from "./Postmodal.module.scss";
export default function PostModal() {
  const {
    state: { activePost },
  } = usePostContext();

  const { mutate: likePost } = useLikePost();
  return (
    <div className={styles.postModal}>
      <div className={styles.imgWrapper}>
        <img
          onDoubleClick={() => likePost(activePost._id)}
          src={`http://127.0.0.1:3000/${activePost.images[0]}`}
          alt="post img"
        />
      </div>
      <PostModalRightPanel />
    </div>
  );
}
