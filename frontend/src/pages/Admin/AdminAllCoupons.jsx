import React from 'react';
import DashboardHeader from '../../components/Admin/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Admin/Layout/DashboardSideBar';
import AllCoupons from '../../components/Admin/AllCoupons.jsx';

const AdminAllCoupons = () => {
  return (
    <div>
      <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={9} />
          </div>
          <div className="w-full justify-center flex">
            <AllCoupons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllCoupons;
