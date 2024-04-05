import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  AdminCreatePage,
  AdminActivationPage,
  AdminLoginPage,
} from './Routes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store.js';
import { loadAdmin, loadUser } from './redux/action/user.js';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProductedRoute.js';
import CheckoutPage from './pages/CheckoutPage';
import { AdminHomePage } from './AdminRoutes';
import AdminProtectedRoute from './AdminProtectedRoute.js';

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isAdmin } = useSelector((state) => state.admin);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadAdmin());
  }, []);

  return (
    <div>
      {loading || isLoading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route
              path="/admin/activation/:activation_token"
              element={<AdminActivationPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Admin Route */}
            <Route path="/admin-create" element={<AdminCreatePage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route
              path="/admin/:id"
              element={
                <AdminProtectedRoute isAdmin={isAdmin}>
                  <AdminHomePage />
                </AdminProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
