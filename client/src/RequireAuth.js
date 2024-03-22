import { useNavigate } from "react-router";

const RequireAuth = ({ userRole, allowedRoles, children }) => {
  const navigate = useNavigate();

  if (!allowedRoles.includes(userRole)) {
    navigate("/signin");
    return;
  }
  return children;
};

export default RequireAuth;
