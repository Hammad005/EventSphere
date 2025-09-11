import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/pages/sub-components/DashboardSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <DashboardSidebar />
        </div>
        <div className="col-span-10">
          <DashboardNavbar />
          <div className="px-3 py-2">
          <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
