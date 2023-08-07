/* eslint-disable react/prop-types */
import { usePostContext } from "../../context/ActivePost";
import styles from "./Postmodal.module.scss";
import { useGetPost } from "../../hooks/usePostActions";
import Spinner from "../Spinner/Spinner";
import Creator from "./Creator";
import Comments from "./Comments";
import ActionPanel from "./ActionPanel";

export default function PostModalRightPanel() {
  const {
    state: { activePost },
  } = usePostContext();
  const { data, isLoading } = useGetPost(activePost._id);

  if (isLoading) return <Spinner />;
  const { post } = data;

  return (
    <div className={styles.rightPanel}>
      <Creator creator={activePost.creator} />
      <Comments comments={post.comments} />
      <ActionPanel post={post} />
    </div>
  );
}
