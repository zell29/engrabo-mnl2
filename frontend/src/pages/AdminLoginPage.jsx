import React, { useEffect } from 'react';

import AdminLogin from '../components/Admin/AdminLogin';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { isAdmin, admin } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isAdmin === true) {
      navigate(`/admin/${admin._id}`);
    }
  }, [isAdmin, admin, navigate]);

  return (
    <div>
      <AdminLogin />
    </div>
  );
};

export default AdminLoginPage;
