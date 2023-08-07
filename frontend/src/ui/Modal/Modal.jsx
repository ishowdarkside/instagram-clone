/* eslint-disable react/prop-types */
import { usePostContext } from "../../context/ActivePost";
import styles from "./Modal.module.scss";
import { IoCloseSharp } from "react-icons/io5";
import { createPortal } from "react-dom";
export default function Modal({ children }) {
  const { dispatch } = usePostContext();

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        dispatch({ type: "reset" });
      }}
    >
      <button
        className={styles.closeModal}
        onClick={() => dispatch({ type: "reset" })}
      >
        {<IoCloseSharp />}
      </button>
      <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
