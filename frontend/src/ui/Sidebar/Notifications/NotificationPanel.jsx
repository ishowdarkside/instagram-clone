/* eslint-disable react/prop-types */
import { IoCloseSharp } from "react-icons/io5";
import styles from "../Sidebar.module.scss";
import Request from "./Request";

export default function NotificationPanel({ user, setterFnc }) {
  return (
    <div className={styles.notificationPanel}>
      <button
        className={styles.closeNotifications}
        onClick={() => setterFnc(false)}
      >
        <IoCloseSharp />
      </button>
      <h2>Notifications</h2>
      {user.requests.length === 0 && (
        <span className={styles.nullNotifications}>Nothing to show here!</span>
      )}
      {user.requests.length > 0 && (
        <div className={styles.requestsWrapper}>
          <span>Follow requests</span>
          {}
          {user.requests.map((r) => (
            <Request request={r} key={r._id} />
          ))}
        </div>
      )}
    </div>
  );
}
