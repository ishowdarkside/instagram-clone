import styles from "./Recommended.module.scss";
import { useGetCEO } from "../../hooks/useProfileActions";
import Spinner from "../..//ui/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
export default function Recommended() {
  const { data, isLoading } = useGetCEO();
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;
  const { CEO } = data;
  return (
    <div className={styles.RecommendedTab}>
      <span>Suggested for you</span>
      <div
        className={styles.ceoWrapper}
        onClick={() => navigate(`/app/profile/${CEO._id}`)}
      >
        <img src={`http://127.0.0.1:3000/${CEO.profilePicture}`} alt="avatar" />
        <div>
          <b>{CEO.username}</b>
          <span>
            {CEO.firstName} {CEO.lastName}
          </span>
        </div>
      </div>
    </div>
  );
}
