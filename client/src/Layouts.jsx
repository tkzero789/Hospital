import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import RequireAuth from "./RequireAuth";
// staff pages
import Dashboard from "./pages/workspace/dashboard";
import StaffLayout from "./pages/layout/StaffLayout";
// symptom pages
import SymptomTable from "./pages/workspace/symptomTable";
import CreateSymptom from "./pages/symptom/newSymptom";
import ViewSymptom from "./pages/symptom/viewSymptom";
import EditSymptom from "./pages/symptom/editSymptom";
// disease pages
import DiseaseTable from "./pages/workspace/diseaseTable";
import CreateDisease from "./pages/disease/createDisease";
import ViewDisease from "./pages/disease/viewDisease";
import EditDisease from "./pages/disease/editDisease";
// article pages
import ArticleTable from "./pages/workspace/articleTable";
import ArticleTableByDise from "./pages/workspace/articleTableByDise";
import CreateArticle from "./pages/article/createArticle";
import ViewArticle from "./pages/article/viewArticle";
import EditArticle from "./pages/article/editArticle";
// appointment pages
import ApptTable from "./pages/workspace/apptTable";
// user pages
import UserTable from "./pages/workspace/userTable";
// guest pages
import GuestLayout from "./pages/layout/GuestLayout";
import SymptomChecker from "./pages/guest/symptomChecker";
import Home from "./pages/guest/home";
import ApptRequest from "./pages/guest/apptRequest";
import ArticlePatientView from "./pages/guest/articlePatientView";

export default function Layouts({ userRole, userInfos }) {
  return (
    <div>
      {userRole ? (
        <StaffLayout>
          {/* dashboard */}
          <Routes>
            <Route
              path="/dashboard"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/"
              element={<Navigate to="/dashboard" replace={true} />}
            />
            {/* symptom pages */}
            <Route
              path="/symptom-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <SymptomTable userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/symptom/create"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "admin"]}
                >
                  <CreateSymptom userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/symptom/:symptomId/view"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ViewSymptom userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/symptom/:symptomId/edit"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "admin"]}
                >
                  <EditSymptom userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* disease pages */}
            <Route
              path="/disease-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <DiseaseTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/create"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "admin"]}
                >
                  <CreateDisease userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/view"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ViewDisease userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/edit"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "admin"]}
                >
                  <EditDisease userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* article pages */}
            <Route
              path="article-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ArticleTable userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="disease/:diseaseId/article-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ArticleTableByDise userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/article/:articleId/view"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ViewArticle userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/article/:articleId/edit"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <EditArticle userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/article/create"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <CreateArticle userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* appointment pages */}
            <Route
              path="/appointment-table"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <ApptTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* user pages */}
            <Route
              path="/user-table"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <UserTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
          </Routes>
        </StaffLayout>
      ) : (
        <GuestLayout>
          <Routes>
            {/* guest pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route
              path="/articles/:articleId"
              element={<ArticlePatientView userInfos={userInfos} />}
            />
            <Route
              exact
              path="/"
              element={<Navigate to="/home" replace={true} />}
            />
            <Route path="/appt-request" element={<ApptRequest />} />
          </Routes>
        </GuestLayout>
      )}
    </div>
  );
}
