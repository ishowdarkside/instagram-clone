/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useProtect } from "../../hooks/useProtect";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./followers.module.scss";

export default function FollowersModal() {
  const { data, isLoading } = useProtect();
  if (isLoading) return <Spinner />;
  const { user } = data;
  return (
    <div className={styles.followers}>
      <h1>Followers</h1>
      {user.followers.length > 0 &&
        user.followers.map((f) => <Follower data={f} key={f._id} />)}

      {user.followers.length === 0 && (
        <span className={styles.noResults}>Oh, so empty 😿</span>
      )}
    </div>
  );
}

function Follower({ data }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/app/profile/${data._id}`)}>
      <img src={`http://127.0.0.1:3000/${data.profilePicture}`} alt="avatar" />
      <span>{data.username}</span>
    </div>
  );
}
