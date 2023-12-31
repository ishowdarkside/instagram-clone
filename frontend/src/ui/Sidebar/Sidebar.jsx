/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useProtect } from "../../hooks/useProtect";
import styles from "./Sidebar.module.scss";

import { useState } from "react";
import NotificationPanel from "./Notifications/NotificationPanel";
import SidebarList from "./SidebarList";
import Search from "./Search/Search";
import Modal from "../Modal/Modal";
import { usePostContext } from "../../context/ActivePost";
import CreatePostModal from "./CreatePostModal/CreatePostModal";
export default function Sidebar() {
  const {
    data: { user },
  } = useProtect();

  const [activeTab, setActiveTab] = useState();
  const [isNotificationsActive, setIsNotificationsActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const {
    state: { isOpenPostModal },
  } = usePostContext();

  return (
    <>
      <aside className={styles.sidebar}>
        <Link to="/app/dashboard" className={styles.logo}>
          <img src="/logo.svg" alt="logo " />
        </Link>

        <SidebarList
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsNotificationsActive={setIsNotificationsActive}
          user={user}
          setIsSearchActive={setIsSearchActive}
        />
        {isNotificationsActive && (
          <NotificationPanel user={user} setterFnc={setIsNotificationsActive} />
        )}

        {isSearchActive && <Search setIsSearchActive={setIsSearchActive} />}
      </aside>
      {isOpenPostModal && (
        <Modal>
          <CreatePostModal />
        </Modal>
      )}
    </>
  );
}
