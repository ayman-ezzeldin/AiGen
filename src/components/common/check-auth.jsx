import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, isVerified, children }) => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <>{children}</>;
  }

  // لو المستخدم مش مسجّل دخول
  if (!isAuthenticated) {
    if (
      !(
        location.pathname.includes("login") ||
        location.pathname.includes("register")
      )
    ) {
      return <Navigate to="/auth/login" />;
    }
  } else {
    // ✅ لو المستخدم مسجّل دخول بس مش مفعّل
    if (!isVerified && !location.pathname.includes("verify")) {
      return <Navigate to="/auth/verify" />;
    }

    // ✅ لو مفعّل الإيميل وداخل على login أو register نرجعه للصفحة الرئيسية
    if (
      isVerified &&
      (location.pathname.includes("login") ||
        location.pathname.includes("register") ||
        location.pathname.includes("verify"))
    ) {
      return <Navigate to="/user/home" />;
    }
  }

  return <>{children}</>;
};

export default CheckAuth;
