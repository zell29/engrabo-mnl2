import React, { useEffect } from 'react';
import AdminCreate from '../components/Admin/AdminCreate';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminCreatePage = () => {
  const navigate = useNavigate();
  const { isAdmin, admin } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isAdmin === true) {
      navigate(`/admin/${admin._id}`);
    }
  }, [isAdmin, admin, navigate]);

  return (
    <div>
      <AdminCreate />
    </div>
  );
};

export default AdminCreatePage;
