import { useProtect } from "../../hooks/useProtect";
import styles from "./Me.module.scss";

export default function InfoPanel() {
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
