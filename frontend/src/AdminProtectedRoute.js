import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ isAdmin, admin, children }) => {
  if (!isAdmin) {
    return <Navigate to={`/`} replace />;
  }
  return children;
};

export default AdminProtectedRoute;
