/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../hooks/useProfileActions";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./Modals.module.scss";
import { usePostContext } from "../../context/ActivePost";

export default function FollowingModal() {
  const { data, isLoading } = useGetProfile();
  if (isLoading) return <Spinner />;
  const { user } = data;
  return (
    <div className={styles.followers}>
      <h1>Following</h1>
      {user.following.length > 0 &&
        user.following.map((f) => <Following data={f} key={f._id} />)}
      {user.following.length === 0 && (
        <span className={styles.noResults}>Oh, so empty 😿</span>
      )}
    </div>
  );
}

function Following({ data }) {
  const { dispatch } = usePostContext();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        dispatch({ type: "reset" });
        navigate(`/app/profile/${data._id}`);
      }}
    >
      <img src={`/${data.profilePicture}`} alt="avatar" />
      <span>{data.username}</span>
    </div>
  );
}
