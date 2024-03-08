import React from "react";
import { useNavigate } from "react-router";

const RequireAuth = ({ userRole, allowedRoles, children }) => {
  const navigate = useNavigate();

  // Check if the user's role is allowed
  if (!allowedRoles.includes(userRole)) {
    // Redirect to login or unauthorized page

    navigate("/signin");
    return;
  }

  // Render the requested component
  return children;
};

export default RequireAuth;
