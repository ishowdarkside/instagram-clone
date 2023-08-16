import { usePostContext } from "../../context/ActivePost";
import { useLikePost } from "../../hooks/usePostActions";
import ImageSlider from "../Slider/ImageSlider";
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
        <ImageSlider>
          {activePost.images.map((i) => {
            return (
              <img
                key={i}
                onDoubleClick={() => likePost(activePost._id)}
                src={`/${i}`}
                alt="post img"
                className={styles.postImg}
              />
            );
          })}
        </ImageSlider>
      </div>
      <PostModalRightPanel />
    </div>
  );
}
