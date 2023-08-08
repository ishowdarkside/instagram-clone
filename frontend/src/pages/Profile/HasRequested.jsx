import { useParams } from "react-router-dom";
import { useAcceptRequest } from "../../hooks/useProfileActions";
import styles from "./hasRequested.module.scss";
export default function HasRequested() {
  const { mutate: acceptRequest } = useAcceptRequest();
  const { profileId } = useParams();
  return (
    <div className={styles.hasRequested}>
      <span>This user wants to follow you</span>
      <div>
        <button onClick={() => acceptRequest(profileId)}>Accept</button>
        <button>decline</button>
      </div>
    </div>
  );
}
