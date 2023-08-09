import { useGetFeed } from "../../hooks/useProfileActions";
import Modal from "../../ui/Modal/Modal";
import PostModal from "../../ui/PostModal/PostModal";
import styles from "./Dashboard.module.scss";
import Spinner from "../../ui/Spinner/Spinner";
import FeedPost from "./FeedPost";
import { usePostContext } from "../../context/ActivePost";
import Recommended from "./Recommended";
export default function Dashboard() {
  const { data, isLoading } = useGetFeed();
  const {
    state: { isOpenModal },
  } = usePostContext();
  if (isLoading) return <Spinner />;

  if (data.length === 0)
    return (
      <>
        <Recommended />
        <div className={styles.noPosts}>
          <img src="/user-circle-plus-thin.svg" alt="explore users" />
          <span>Follower users to start exploring their everyday lives!</span>
        </div>
      </>
    );
  return (
    <>
      <div className={styles.feedWrapper}>
        {data.map((post) => (
          <FeedPost post={post} key={post._id} />
        ))}
      </div>

      {isOpenModal && (
        <Modal>
          <PostModal />
        </Modal>
      )}

      <Recommended />
    </>
  );
}
