import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  // const isAdmin = user?.role === 'admin';

  // Allow access to the Home page without authentication
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users away from protected pages (except login and register)
    if (!(location.pathname.includes('login') || location.pathname.includes('register'))) {
      return <Navigate to="/auth/login" />;
    }
  } 
  // If the user is authenticated
  else {
    // Redirect authenticated users to their appropriate home based on role when accessing login or register pages
    if (location.pathname.includes('login') || location.pathname.includes('register')) {
      return <Navigate to= "/user/home" />;
    }

    // Prevent non-admin users from accessing admin pages
    // if (location.pathname.includes('admin') && !isAdmin) {
    //   return <Navigate to="/unauth-page" />;
    // }

    // Prevent admin users from accessing user-specific pages
    // if (location.pathname.includes('user') && isAdmin) {
    //   return <Navigate to="/admin/home" />;
    // }
  }

  return <>{children}</>;
};

export default CheckAuth;
