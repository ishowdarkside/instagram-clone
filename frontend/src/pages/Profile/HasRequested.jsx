import { useParams } from "react-router-dom";
import {
  useAcceptRequest,
  useDeclineRequest,
} from "../../hooks/useProfileActions";
import styles from "./hasRequested.module.scss";
export default function HasRequested() {
  const { mutate: acceptRequest } = useAcceptRequest();
  const { mutate: declineRequest } = useDeclineRequest();
  const { profileId } = useParams();
  return (
    <div className={styles.hasRequested}>
      <span>This user wants to follow you</span>
      <div>
        <button onClick={() => acceptRequest(profileId)}>Accept</button>
        <button onClick={() => declineRequest(profileId)}>Decline</button>
      </div>
    </div>
  );
}
