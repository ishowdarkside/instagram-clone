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
import HasRequested from "./HasRequested";
import { useEffect } from "react";

export default function Profile() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { state } = usePostContext();
  const {
    data: { user },
    isLoading: isLoadingUser,
  } = useProtect();

  useEffect(() => {
    if (user._id === profileId) return navigate("/app/me");
  }, [profileId]);

  const { data, isLoading: isLoadingProfile } = useGetProfile(profileId);
  if (isLoadingProfile || isLoadingUser) return <Spinner />;

  if (data.status === "fail")
    return <span className={styles.errorMsg}>{data.message}</span>;

  return (
    <div className={styles.profilePanel}>
      {user.requests.some((el) => el._id === profileId) && <HasRequested />}
      <ProfileInfoPanel profile={data.user} />
      <ProfilePosts />
      {state.isOpenModal && <Modal>{<PostModal />}</Modal>}
    </div>
  );
}
