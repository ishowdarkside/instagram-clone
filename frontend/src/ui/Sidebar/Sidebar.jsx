/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useProtect } from "../../hooks/useProtect";
import styles from "./Sidebar.module.scss";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
export default function Sidebar() {
  const {
    data: { user },
  } = useProtect();

  const [activeTab, setActiveTab] = useState();
  const [isNotificationsActive, setIsNotificationsActive] = useState(false);
  const navigate = useNavigate();
  return (
    <aside className={styles.sidebar}>
      <Link to="/app/dashboard" className={styles.logo}>
        <img src="/logo.svg" alt="logo " />
      </Link>

      <ul className={styles.sidebarList}>
        <li
          className={activeTab === "home" ? styles.active : ""}
          onClick={() => {
            setActiveTab("home");
            navigate("/app/dashboard");
          }}
        >
          <img
            src={`/house-${activeTab === "home" ? "fill" : "thin"}.svg`}
            alt="home"
          />
          Home
        </li>
        <li
          className={activeTab === "search" ? styles.active : ""}
          onClick={() => setActiveTab("search")}
        >
          <img
            src={`/search-${activeTab === "search" ? "fill" : "thin"}.svg`}
            alt="search"
          />
          Search
        </li>
        <li
          className={activeTab === "explore" ? styles.active : ""}
          onClick={() => {
            setActiveTab("explore");
            navigate("/app/explore");
          }}
        >
          <img
            src={`/explore-${activeTab === "explore" ? "fill" : "thin"}.svg`}
            alt="explore"
          />
          Explore
        </li>
        <li
          className={activeTab === "notifications" ? styles.active : ""}
          onClick={() => {
            setIsNotificationsActive(true);
            setActiveTab("notifications");
          }}
        >
          <div
            className={`${
              user.requests.length > 0 ? styles.hasNotification : ""
            }`}
          >
            <img
              src={`/bell-${
                activeTab === "notifications" ? "fill" : "thin"
              }.svg`}
              alt="notifications"
            />
          </div>
          Notifications
        </li>
        <li
          className={activeTab === "create" ? styles.active : ""}
          onClick={() => setActiveTab("create")}
        >
          <img
            src={`/create-${activeTab === "create" ? "fill" : "thin"}.svg`}
            alt="create"
          />
          Create
        </li>
        <li
          className={activeTab === "profile" ? styles.active : ""}
          onClick={() => {
            setActiveTab("profile");
            navigate("/app/me");
          }}
        >
          <img
            src={`http://127.0.0.1:3000/${user.profilePicture}`}
            alt="profile img"
          />
          Profile
        </li>
      </ul>

      {isNotificationsActive && (
        <NotificationPanel user={user} setterFnc={setIsNotificationsActive} />
      )}
    </aside>
  );
}

function NotificationPanel({ user, setterFnc }) {
  return (
    <div className={styles.notificationPanel}>
      <button
        className={styles.closeNotifications}
        onClick={() => setterFnc(false)}
      >
        <IoCloseSharp />
      </button>
      <h2>Notifications</h2>
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

function Request(request) {
  const { request: req } = request;
  return (
    <Link to={`/app/profile/${req._id}`}>
      <img src={`http://127.0.0.1:3000/${req.profilePicture}`} alt="avatar" />
      <span>{req.username}</span>
    </Link>
  );
}
