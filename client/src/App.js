import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/styles.css";
import "./css/responsive.css";
import "./css/base.css";
import CreateSymptom from "./pages/createSymptom";
import NewSymptom from "./pages/newSymptom";
import EditSymptom from "./pages/editSymptom";
import CreateAritcle from "./pages/createArticle";
import SymptomChecker from "./pages/symptomChecker";
import Signup from "./pages/signup";
import SignupDoctor from "./pages/signupDoctor";
import Signin from "./pages/signin";
import Home from "./pages/home";
import TestHome from "./pages/testHome";
import ScrollToTop from "./components/Functionals/ScrollToTop";
import ApptRequest from "./pages/apptRequest";
import { useAuth } from "./AuthContext";
import RequireAuth from "./RequireAuth";
import ArticlePatientView from "./pages/articlePatientView";
import TestSignin from "./pages/testSignin";
import AdminHome from "./pages/home/AdminHome";
import Login from "./pages/login/Login";
import DoctorList from "./pages/list/DoctorList";
import ArticleList from "./pages/list/ArticleList";

import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";

const App = () => {
  const { getUserRole } = useAuth();
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
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users">
          <Route index element={<DoctorList />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
        </Route>
        <Route path="/articles">
          <Route index element={<ArticleList />} />
          <Route path=":articlesId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={productInputs} title="Add New Product" />}
          />
        </Route>
        <Route path="/appt-request" element={<ApptRequest />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-doctor" element={<SignupDoctor />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/test-signin" element={<TestSignin />} />
        <Route path="/articles/:id" element={<ArticlePatientView />} />
        <Route
          path="/create-symptom"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["doctor", "admin"]}
            >
              <CreateSymptom />
            </RequireAuth>
          }
        />
        <Route
          path="/new-symptom"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["doctor", "admin"]}
            >
              <NewSymptom />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-symptom/:id"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["doctor", "admin"]}
            >
              <EditSymptom />
            </RequireAuth>
          }
        />
        <Route
          path="/create-article"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["doctor", "admin"]}
            >
              <CreateAritcle />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
