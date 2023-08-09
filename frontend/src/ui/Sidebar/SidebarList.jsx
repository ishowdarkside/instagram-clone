/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { usePostContext } from "../../context/ActivePost";
export default function SidebarList({
  activeTab,
  setActiveTab,
  setIsNotificationsActive,
  user,
  setIsSearchActive,
}) {
  const { dispatch } = usePostContext();
  const navigate = useNavigate();
  return (
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
        onClick={() => {
          setIsSearchActive(true);
          setActiveTab("search");
        }}
      >
        <img
          src={`/search-${activeTab === "search" ? "fill" : "thin"}.svg`}
          alt="search"
        />
        Search
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
            src={`/bell-${activeTab === "notifications" ? "fill" : "thin"}.svg`}
            alt="notifications"
          />
        </div>
        Notifications
      </li>
      <li
        className={activeTab === "create" ? styles.active : ""}
        onClick={() => {
          setActiveTab("create");
          dispatch({ type: "openPostModal" });
        }}
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
  );
}
