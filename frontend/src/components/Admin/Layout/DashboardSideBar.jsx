import React from 'react';
import { AiOutlineGift, AiOutlineLogout } from 'react-icons/ai';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
// import { MdOutlineLocalOffer } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { RiLockPasswordLine } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { server } from '../../../server';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLocalOffer } from 'react-icons/md';

const DashboardSideBar = ({ active }) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/admin/logout`, {
        withCredentials: true,
      });
      // Add here if you want to navigate and then reload
      navigate('/admin-login', { replace: true });
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className="w-full h-[89vh] bg-[#f7ebca] shadow-sm overflow-y-scroll hide-scrollbar  sticky top-0 left-0 z-10">
      {/* Dashboard */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? '#171203' : '#6b540f'}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 1 ? 'text-[#171203]' : 'text-[#6b540f]'
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      {/* All Orders */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <FiPackage
            size={30}
            color={`${active === 2 ? '#171203' : '#6b540f'}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 2 ? 'text-[#171203]' : 'text-[#6b540f]'
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      {/* All Products */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 3 ? '#171203' : '#6b540f'}`}
          />
          <h5
            className={`800px:block hidden  pl-2 text-[18px] font-[400] ${
              active === 3 ? 'text-[#171203]' : 'text-[#6b540f]'
            }`}
          >
            Products
          </h5>
        </Link>
      </div>

      {/* All Events */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? '#171203' : '#6b540f'}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 5 ? 'text-[#171203]' : 'text-[#6b540f]'
            }`}
          >
            Events
          </h5>
        </Link>
      </div>

      {/* Coupon Codes */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-coupons" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? '#171203' : '#6b540f'}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 9 ? 'text-[#171203]' : 'text-[#6b540f]'
            }`}
          >
            Coupon Codes
          </h5>
        </Link>
      </div>

      {/* Withdraw Money
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? '#171203' : '#6b540f'}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 7 ? 'text-[#171203]' : 'text-[#6b540f]'
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div> */}

      {/* Admin Inbox */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 6 ? '#171203' : '#6b540f'}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 6 ? 'text-[#171203]' : 'text-[#6b540f]'
            }`}
          >
            Admin Inbox
          </h5>
        </Link>
      </div>

      {/* Refunds */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 7 ? '#171203' : '#6b540f'}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 7 ? 'text-[#171203]' : 'text-[#6b540f]'
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      {/* Settings */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-settings" className="w-full flex items-center">
          <RiLockPasswordLine
            size={30}
            color={`${active === 8 ? '#171203' : '#6b540f'}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 8 ? 'text-[#171203]' : 'text-[#6b540f]'
            }`}
          >
            Change Password
          </h5>
        </Link>
      </div>

      {/* Logout */}
      <div className="w-full flex items-center p-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            logoutHandler();
          }}
          className="w-full flex items-center"
        >
          <AiOutlineLogout
            size={30}
            color={`${active === 11 ? '#171203' : '#6b540f'}`}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 11 ? 'text-[#171203]' : 'text-[#6b540f]'
            }`}
          >
            Log Out
          </h5>
        </button>
      </div>
    </div>
  );
};

export default DashboardSideBar;
