import React from 'react';
import DashboardHeader from '../../components/Admin/Layout/DashboardHeader';
import Footer from '../../components/Layout/Footer';
import OrderDetails from '../../components/Admin/OrderDetails';

const AdminOrdersDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default AdminOrdersDetails;
