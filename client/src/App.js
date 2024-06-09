import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "css/index.css";
import "css/base.css";
import { useAuth } from "AuthContext";
import RequireAuth from "RequireAuth";
import ScrollToTop from "utilities/ScrollToTop";
// auth pages
import SignupDoctor from "pages/account/signupStaff";
import SigninStaff from "pages/account/signinStaff";

// routes
import Layouts from "Layouts";
import StaffHome from "pages/homepage/staffHome";

const App = () => {
  const { getUserRole, getUserInfos } = useAuth();
  const userRole = getUserRole();
  const userInfos = getUserInfos();
  return (
    <div style={{ overflow: "hidden" }}>
      <ScrollToTop />

      <Routes>
        {/* auth pages */}
        <Route
          path="/signup-doctor"
          element={
            <RequireAuth
              userRole={userRole}
              allowedRoles={["admin", "doctor", "head-doctor"]}
            >
              <SignupDoctor userRole={userRole} userInfos={userInfos} />
            </RequireAuth>
          }
        />
        <Route path="/signin-staff" element={<SigninStaff />} />
        {/* layouts and content */}
        <Route
          path="/*"
          element={<Layouts userRole={userRole} userInfos={userInfos} />}
        />
        <Route
          path="/staff-home"
          element={
            <RequireAuth
              userRole={userRole}
              allowedRoles={["head-doctor", "doctor", "admin"]}
            >
              <StaffHome />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
