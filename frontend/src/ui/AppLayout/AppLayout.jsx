import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./AppLayout.module.scss";

import { usePostContext } from "../../context/ActivePost";

export default function AppLayout() {
  const { state } = usePostContext();

  return (
    <div className={styles.layout}>
      <Sidebar />
      <Outlet />
    </div>
  );
}
