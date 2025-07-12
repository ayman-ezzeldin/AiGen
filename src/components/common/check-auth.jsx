import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, isVerified, children }) => {
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    let timeout;

    if (isAuthenticated && !isVerified) {
      timeout = setTimeout(() => {
        setShouldRedirect(true);
      }, 1000); // 1 second delay
    } else {
      setShouldRedirect(false); // Reset on verification or logout
    }

    return () => clearTimeout(timeout); // Clean up on unmount or re-run
  }, [isAuthenticated, isVerified]);

  if (location.pathname === "/") {
    return <>{children}</>;
  }

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
    if (shouldRedirect && !location.pathname.includes("verify")) {
      return <Navigate to="/auth/verify" />;
    }

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
