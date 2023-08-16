import { useProtect } from "../../hooks/useProtect";
import Modal from "..//../ui/Modal/Modal";
import styles from "./Me.module.scss";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../../context/ActivePost";
import FollowingModal from "./FollowingModal";
import FollowersModal from "./FollowersModal";
export default function InfoPanel() {
  const {
    state: { isOpenFollowingModal, isOpenFollowersModal },
    dispatch,
  } = usePostContext();

  const {
    data: { user },
  } = useProtect();
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.infoPanel}>
        <img src={`/${user.profilePicture}`} alt="profile pic" />
        <div className={styles.info}>
          <div className={styles.firstRow}>
            <span className={styles.username}>{user.username}</span>
            <button onClick={() => navigate("/app/settings")}>
              Edit Profile
            </button>
          </div>
          <div className={styles.secondRow}>
            <span>
              <b>{user.posts.length}</b> posts
            </span>
            <span
              className={styles.clickable}
              onClick={() => dispatch({ type: "openFollowersModal" })}
            >
              <b>{user.followers.length}</b> followers
            </span>
            <span
              className={styles.clickable}
              onClick={() => dispatch({ type: "openFollowingModal" })}
            >
              <b>{user.following.length}</b> following
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
      {isOpenFollowingModal && (
        <Modal>
          <FollowingModal />
        </Modal>
      )}

      {isOpenFollowersModal && (
        <Modal>
          <FollowersModal />
        </Modal>
      )}
    </>
  );
}
