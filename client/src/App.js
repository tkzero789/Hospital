import React, { useContext } from "react";
// We use Route in order to define the different routes of our application
import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles.css";
import "./responsive.css";
import "./base.css";
// We import all the pages we need in our app
import CreateSymptom from "./pages/createSymptom";
import NewSymptom from "./pages/newSymptom";
import EditSymptom from "./pages/editSymptom";
import CreateAritcle from "./pages/createArticle";
import SymptomChecker from "./pages/symptomChecker";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import SignupDoctor from "./pages/signupDoctor";
import DoctorLogin from "./pages/doctorLogin";
import Home from "./pages/home";
import TestHome from "./pages/testHome";
import ScrollToTop from "./components/ScrollToTop";
import ApptRequest from "./pages/apptRequest";
import { AuthContext } from "./components/AuthContext";
import RequireAuth from "./RequireAuth";

const App = () => {
  const { getUserRole } = useContext(AuthContext);
  return (
    <div style={{ overflow: "hidden" }}>
      <ScrollToTop />
      <Routes>
        <Route
          exact
          path="/"
          element={<Navigate to="/home" replace={true} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/test-home" element={<TestHome />} />
        <Route path="/appt-request" element={<ApptRequest />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-doctor" element={<SignupDoctor />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/create-symptom"
          element={
            // <RequireAuth
            //   userRole={getUserRole()}
            //   allowedRoles={["doctor", "admin"]}
            // >
            //   <CreateSymptom />
            // </RequireAuth>
            <CreateSymptom />
          }
        />
        <Route
          path="/new-symptom"
          element={
            // <RequireAuth
            //   userRole={getUserRole()}
            //   allowedRoles={["doctor", "admin"]}
            // >
            //   <NewSymptom />
            // </RequireAuth>
            <NewSymptom />
          }
        />
        <Route
          path="/edit-symptom/:id"
          element={
            // <RequireAuth
            //   userRole={getUserRole()}
            //   allowedRoles={["doctor", "admin"]}
            // >
            //   <EditSymptom />
            // </RequireAuth>
            <EditSymptom />
          }
        />
        <Route
          path="/create-article"
          element={
            // <RequireAuth
            //   userRole={getUserRole()}
            //   allowedRoles={["doctor", "admin"]}
            // >
            //   <CreateAritcle />
            // </RequireAuth>
            <CreateAritcle />
          }
        />
      </Routes>
    </div>
  );
};
export default App;
