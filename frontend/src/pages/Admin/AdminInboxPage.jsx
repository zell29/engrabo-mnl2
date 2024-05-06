import React from 'react';
import DashboardHeader from '../../components/Admin/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Admin/Layout/DashboardSideBar';
import DashboardMessages from '../../components/Admin/DashboardMessages';

const AdminInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <DashboardMessages />
        </div>
      </div>
    </div>
  );
};

export default AdminInboxPage;
