import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <sidebar>SIDEBAR</sidebar>
      <Outlet />
    </div>
  );
}
