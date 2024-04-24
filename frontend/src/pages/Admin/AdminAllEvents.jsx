import React from 'react';
import DashboardHeader from '../../components/Admin/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Admin/Layout/DashboardSideBar';
import AllEvents from '../../components/Admin/AllEvents';

const AdminAllEvents = () => {
  return (
    <div>
      <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={5} />
          </div>
          <div className="w-full justify-center flex">
            <AllEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllEvents;
