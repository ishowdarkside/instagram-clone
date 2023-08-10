/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../hooks/useProfileActions";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./Modals.module.scss";
import { usePostContext } from "../../context/ActivePost";

export default function FollowersModal() {
  const { data, isLoading } = useGetProfile();

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
  const { dispatch } = usePostContext();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        dispatch({ type: "reset" });
        navigate(`/app/profile/${data._id}`);
      }}
    >
      <img src={`http://127.0.0.1:3000/${data.profilePicture}`} alt="avatar" />
      <span>{data.username}</span>
    </div>
  );
}
