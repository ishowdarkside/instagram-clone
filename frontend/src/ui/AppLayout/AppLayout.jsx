import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./AppLayout.module.scss";
import { usePostContext } from "../../context/ActivePost";
import { useEffect } from "react";

export default function AppLayout() {
  const { state: postState, dispatch } = usePostContext();

  //Adding event listener on window to close modal (if key === escape && modal is Opened)
  //This will be super useful later when i start working on general posts like explore or posts on dashboard page..dont need another logic (sve je ovđe)

  //Isto tako cu moci reuse PostModal (modal koji se nalazi unutar Modal UI komponente.. on samo uzima active post iz global contexta i prikazuje podatke   i treba conditionally renderovati neke buttonse i opcije)
  useEffect(() => {
    const listenerFnc = (e) => {
      if (e.key === "Escape" && postState.isOpenModal)
        dispatch({ type: "reset" });
    };
    window.addEventListener("keydown", listenerFnc);
    return () => window.removeEventListener("keydown", listenerFnc);
  }, [dispatch, postState.isOpenModal]);

  return (
    <div className={styles.layout}>
      <div className={styles.sidebarShallow}>
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
}
