import { useParams } from "react-router-dom";
import { useGetProfile } from "../../hooks/useProfileActions";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./Profile.module.scss";
import ProfilePost from "./ProfilePost";
import { useProtect } from "../../hooks/useProtect";
import Private from "./Private";
import PostNotFound from "./PostNotFound";
export default function Posts() {
  const {
    data: { user: me },
  } = useProtect();
  const { profileId } = useParams();
  const {
    data: { user },
    isLoading,
  } = useGetProfile(profileId);

  if (isLoading) return <Spinner />;
  if (user.isPrivate && !user.followers?.some((el) => el._id === me._id))
    return <Private />;
  return (
    <div className={styles.postWrapper}>
      {user.isPrivate &&
        user.followers.some((el) => el._id === me._id) &&
        user.posts.length === 0 && <PostNotFound />}

      {!user.isPrivate && user.posts.length === 0 && <PostNotFound />}
      {user.posts.length > 0 &&
        user.posts.map((p) => <ProfilePost post={p} key={p._id} />)}
    </div>
  );
}
