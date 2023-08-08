/* eslint-disable react/prop-types */

import { useFollowProfile } from "../../hooks/useProfileActions";
import { useProtect } from "../../hooks/useProtect";
import styles from "./Profile.module.scss";

export default function InfoPanel({ profile }) {
  const {
    data: { user },
  } = useProtect();
  const { mutate: followProfile } = useFollowProfile();

  if (!profile) return null;
  const postCount = profile.posts?.length ?? profile.postCount;
  const followersCount = profile.followers?.length ?? profile.followersCount;
  const followingCount = profile.following?.length ?? profile.followingCount;
  const btnClass = `${styles.followBtn} ${
    user.madeRequests.some((el) => el === profile._id) ? styles.isActive : ""
  } ${
    user.following.some((el) => el._id === profile._id) ? styles.isActive : ""
  }`;

  return (
    <div className={styles.infoPanel}>
      <img
        src={`http://127.0.0.1:3000/${profile.profilePicture}`}
        alt="profile pic"
      />
      <div className={styles.info}>
        <div className={styles.firstRow}>
          <span className={styles.username}>{profile.username}</span>
        </div>
        <div className={styles.secondRow}>
          <span>
            <b>{postCount}</b> posts{" "}
          </span>
          <span>
            <b>{followersCount}</b> followers
          </span>
          <span>
            <b>{followingCount}</b> following
          </span>
        </div>
        <div className={styles.thirdRow}>
          <span className={styles.fullName}>
            {profile.firstName} {profile.lastName}
          </span>

          <span className={styles.description}>{profile.description}</span>
          <button
            className={btnClass}
            onClick={() => followProfile(profile._id)}
          >
            {user.madeRequests.includes(profile._id) && "Requested"}
            {profile.followers &&
              !profile.followers.some((f) => f._id === user._id) &&
              "Follow"}
            {profile.followers?.some((f) => f._id === user._id) && "Following"}
            {profile.isPrivate &&
              !profile.followers &&
              !profile.isRequested &&
              "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}
