import React, { useEffect, useState } from "react";
import { API } from "./axios";
import Login from "../pages/Login";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await API.get("auth/verify");
        if (response) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.log("Error while verify : " + error.message);
      }
    })();
  }, []);
  if (isVerified === null) return <div>Loading...</div>;
  if (!isVerified) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoutes;
