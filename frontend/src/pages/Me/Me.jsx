/* eslint-disable react/prop-types */
import { usePostContext } from "../../context/ActivePost";
import { useProtect } from "../../hooks/useProtect";
import styles from "./Me.module.scss";
import Modal from "../../ui/Modal/Modal";
export default function Me() {
  const { state } = usePostContext();
  return (
    <div className={styles.mePanel}>
      <InfoPanel />
      <Posts />
      {state.isOpenModal && <Modal>{<MyPostModal />}</Modal>}
    </div>
  );
}

function InfoPanel() {
  const {
    data: { user },
  } = useProtect();
  return (
    <div className={styles.infoPanel}>
      <img
        src={`http://127.0.0.1:3000/${user.profilePicture}`}
        alt="profile pic"
      />
      <div className={styles.info}>
        <div className={styles.firstRow}>
          <span className={styles.username}>{user.username}</span>
          <button>Edit Profile</button>
        </div>
        <div className={styles.secondRow}>
          <span>
            <b>{user.posts.length}</b> posts
          </span>
          <span>
            <b>{user.followers.length}</b> followers
          </span>
          <span>
            <b>{user.following.length}</b> followings
          </span>
        </div>
        <div className={styles.thirdRow}>
          <span className={styles.fullName}>
            {user.firstName} {user.lastName}
          </span>

          <span className={styles.description}>{user.description}</span>
        </div>
      </div>
    </div>
  );
}

function Posts() {
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

function Post({ post }) {
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
      <img src={`http://127.0.0.1:3000/${post.images[0]}`} alt="img layer " />
    </div>
  );
}

function MyPostModal() {
  const {
    state: { activePost },
  } = usePostContext();

  console.log(activePost);
}
