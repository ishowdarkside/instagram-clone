/* eslint-disable react/prop-types */
import { usePostContext } from "../../context/ActivePost";
import styles from "./Me.module.scss";
import Modal from "../../ui/Modal/Modal";
import Posts from "./Posts";
import InfoPanel from "./InfoPanel";
import PostModal from "../../ui/PostModal/PostModal";
export default function Me() {
  const { state } = usePostContext();
  return (
    <div className={styles.mePanel}>
      <InfoPanel />
      <Posts />
      {state.isOpenModal && <Modal>{<PostModal />}</Modal>}
    </div>
  );
}
