import { useNavigate, useParams } from "react-router-dom";
import { useGetProfile } from "../../hooks/useProfileActions";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./Profile.module.scss";
import { useProtect } from "../../hooks/useProtect";
import ProfileInfoPanel from "./ProfileInfoPanel";
import ProfilePosts from "./ProfilePosts";
import { usePostContext } from "../../context/ActivePost";
import Modal from "../../ui/Modal/Modal";
import PostModal from "../../ui/PostModal/PostModal";

export default function Profile() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { state } = usePostContext();
  const {
    data: { user },
    isLoading: isLoadingUser,
  } = useProtect();

  const { data, isLoading: isLoadingProfile } = useGetProfile(profileId);
  if (isLoadingProfile || isLoadingUser) return <Spinner />;

  if (data.status === "fail")
    return <span className={styles.errorMsg}>{data.message}</span>;

  if (user._id === profileId) return navigate("/app/me");

  return (
    <div className={styles.profilePanel}>
      <ProfileInfoPanel profile={data.user} />
      <ProfilePosts />
      {state.isOpenModal && <Modal>{<PostModal />}</Modal>}
    </div>
  );
}
