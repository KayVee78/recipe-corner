"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = (WrappedComponent) => (props) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("loggedInUser");
      setIsLoggedIn(!!user);
    };

    checkAuth();

    return () => window.removeEventListener("beforeunload", checkAuth);
  }, []);

  if (!isLoggedIn) {
    router.push("/login");
    return null;
  }

  return <WrappedComponent {...props} />;
};

export default useAuth;
