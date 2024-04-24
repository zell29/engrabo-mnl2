import React from 'react';
import DashboardHeader from '../components/Admin/Layout/DashboardHeader';
import DashboardSideBar from '../components/Admin/Layout/DashboardSideBar';
const AdminDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
