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
} from './routes/Routes.js';
import {
  AdminHomePage,
  AdminDashboardPage,
  AdminCreateProduct,
  AdminAllProducts,
  AdminCreateEvents,
  AdminAllEvents,
  AdminAllCoupons,
  AdminAllCategories,
} from './routes/AdminRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store.js';
import { loadAdmin, loadUser } from './redux/action/user';
import ProtectedRoute from './routes/ProductedRoute';
import CheckoutPage from './pages/CheckoutPage';
// import { AdminHomePage } from './AdminRoutes';
import AdminProtectedRoute from './routes/AdminProtectedRoute';
import { getAllProducts } from './redux/action/product.js';
import { getAllEvents } from './redux/action/event.js';

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadAdmin());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
  }, []);

  return (
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
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
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
            <AdminProtectedRoute>
              <AdminHomePage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-product"
          element={
            <AdminProtectedRoute>
              <AdminCreateProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/dashboard-products"
          element={
            <AdminProtectedRoute>
              <AdminAllProducts />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/dashboard-categories"
          element={
            <AdminProtectedRoute>
              <AdminAllCategories />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-event"
          element={
            <AdminProtectedRoute>
              <AdminCreateEvents />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/dashboard-events"
          element={
            <AdminProtectedRoute>
              <AdminAllEvents />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/dashboard-coupons"
          element={
            <AdminProtectedRoute>
              <AdminAllCoupons />
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
  );
};

export default App;
