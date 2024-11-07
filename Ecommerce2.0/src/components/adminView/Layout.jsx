import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import AdminHeader from "./Header";
import { useState } from "react";

function AdminLayout() {
  const [opensidebar, setOpenSideBar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* sidebar*/}
      <AdminSidebar open={opensidebar} setOpen={setOpenSideBar} />
      <div className="flex flex-1 flex-col ">
        {/* admin header */}
        <AdminHeader open={opensidebar} setOpen={setOpenSideBar} />
        <main className="flex flex-col flex-1 bg-muted/40 p-4 md-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default AdminLayout;
