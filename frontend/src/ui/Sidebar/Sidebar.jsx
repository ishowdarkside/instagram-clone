import { Link, useNavigate } from "react-router-dom";
import { useProtect } from "../../hooks/useProtect";
import styles from "./Sidebar.module.scss";
import { useState } from "react";
export default function Sidebar() {
  const {
    data: { user },
  } = useProtect();

  const [activeTab, setActiveTab] = useState();
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
          onClick={() => setActiveTab("notifications")}
        >
          <img
            src={`/bell-${activeTab === "notifications" ? "fill" : "thin"}.svg`}
            alt="notifications"
          />
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
    </aside>
  );
}
