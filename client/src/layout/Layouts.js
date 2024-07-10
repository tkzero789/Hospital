import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "auth/RequireAuth";
import Spinner from "components/UI/Spinner";
// staff pages
import StaffLayout from "pages/Layout/StaffLayout";

// dashboard page
import Dashboard from "pages/Dashboard/Dashboard";

// symptom pages
import SymptomTable from "pages/DataTable/SymptomTable";
import CreateSymptom from "pages/Symptom/CreateSymptom";
import EditSymptom from "pages/Symptom/EditSymptom";
import ApproveSymptom from "pages/Symptom/ApproveSymptom";
import ViewSymptom from "pages/Symptom/ViewSymptom";
// disease pages
import DiseaseTable from "pages/DataTable/DiseaseTable";
import CreateDisease from "pages/Disease/CreateDisease";
import EditDisease from "pages/Disease/EditDisease";
import ViewDisease from "pages/Disease/ViewDisease";
// article pages
import ArticleTable from "pages/DataTable/ArticleTable";
import ArticleTableByDisease from "pages/DataTable/ArticleTableByDisease";
import CreateArticle from "pages/Article/CreateArticle";
import ApproveArticle from "pages/Article/ApproveArticle";
import ViewArticle from "pages/Article/ViewArticle";
import EditArticle from "pages/Article/EditArticle";
// appointment pages
import ApptTable from "pages/DataTable/ApptTable";
import ViewAppt from "pages/Appointment/ViewAppt";
// blog pages
import CreateBlog from "pages/Blog/CreateBlog";
import BlogTable from "pages/DataTable/BlogTable";
import ViewBlog from "pages/Blog/ViewBlog";
import EditBlog from "pages/Blog/EditBlog";
// user pages
import UserTable from "pages/DataTable/UserTable";
import ViewUser from "pages/User/ViewUser";
import EditUser from "pages/User/EditUser";
// guest pages
import GuestLayout from "pages/Layout/GuestLayout";
import SymptomChecker from "pages/SymptomChecker/SymptomChecker";
import Home from "pages/HomePage/Home";
import CreateAppt from "pages/Appointment/CreateAppt";
import ApptDetailGuest from "pages/Appointment/ApptDetailGuest";
import ArticlePatientView from "pages/Article/ArticlePatientView";
import Work from "pages/WorkSchedule/WorkSchedule";
import SpecialtyPage from "pages/Specialty/SpecialtyPage";
import SpecialtyDetail from "pages/Specialty/SpecialtyDetail";
import ViewBlogList from "pages/Blog/ViewBlogList";
import ViewSpecificBlog from "pages/Blog/ViewSpecificBlog";
import NotFound from "pages/NotFound/NotFound";

export default function Layouts({ userRole, userInfos }) {
  const [isLoading, setIsLoading] = useState(true);

  // Set time out
  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {isLoading && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      {!isLoading && userRole && (
        <StaffLayout>
          {/* dashboard (default) */}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  {userRole === "admin" ? (
                    <Navigate to="/dashboard" replace={true} />
                  ) : userRole === "head-doctor" || userRole === "doctor" ? (
                    <Navigate to="/symptom-table" replace={true} />
                  ) : (
                    <Navigate to="/unauthorized" replace={true} />
                  )}
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <Dashboard userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />

            {/* symptom pages */}
            <Route
              path="/symptom-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <SymptomTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/symptom/create"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["head-doctor"]}>
                  <CreateSymptom userRole={userRole} userInfos={userInfos} />
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
                  <EditSymptom userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/symptom/approve/:symptomId"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <ApproveSymptom userRole={userRole} userInfos={userInfos} />
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
                  <ViewSymptom userRole={userRole} userInfos={userInfos} />
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
                <RequireAuth userRole={userRole} allowedRoles={["head-doctor"]}>
                  <CreateDisease userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/edit"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["head-doctor"]}>
                  <EditDisease userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/view/:diseaseId"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ViewDisease userRole={userRole} userInfos={userInfos} />
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
                  <ArticleTable userRole={userRole} userInfos={userInfos} />
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
                  <ArticleTableByDisease
                    userRole={userRole}
                    userInfos={userInfos}
                  />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/article/create"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor"]}
                >
                  <CreateArticle userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/disease/:diseaseId/article/:articleId/edit"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor"]}
                >
                  <EditArticle userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/article/:articleId/approve"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor", "admin"]}
                >
                  <ApproveArticle userRole={userRole} userInfos={userInfos} />
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
                  <ViewArticle userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/articles/:articleId"
              element={
                <ArticlePatientView userRole={userRole} userInfos={userInfos} />
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
            <Route
              path="/appointment/:apptId/view"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <ViewAppt userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            {/* blog pages */}
            <Route
              path="/create-blog"
              element={<CreateBlog userInfos={userInfos} />}
            />
            <Route
              path="/blog-table"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["admin", "head-doctor", "doctor"]}
                >
                  <BlogTable userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/blog/:blogId/view"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["admin", "head-doctor", "doctor"]}
                >
                  <ViewBlog userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/blog/:blogId/edit"
              element={
                <RequireAuth
                  userRole={userRole}
                  allowedRoles={["head-doctor", "doctor"]}
                >
                  <EditBlog userRole={userRole} userInfos={userInfos} />
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
            <Route
              path="/user/:userId/view"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <ViewUser userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
            <Route
              path="/user/:userId/edit"
              element={
                <RequireAuth userRole={userRole} allowedRoles={["admin"]}>
                  <EditUser userRole={userRole} userInfos={userInfos} />
                </RequireAuth>
              }
            />
          </Routes>
        </StaffLayout>
      )}
      {!isLoading && !userRole && (
        <GuestLayout>
          <Routes>
            {/* guest pages */}
            <Route path="/home" element={<Home userRole={userRole} />} />
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
            <Route path="/appt-request" element={<CreateAppt />} />
            <Route path="/appt-detail-guest" element={<ApptDetailGuest />} />
            <Route path="/specialty-page" element={<SpecialtyPage />} />
            <Route
              path="/specialty-page/:specialtyId"
              element={<SpecialtyDetail />}
            />
            <Route path="/work-schedule" element={<Work />} />
            <Route path="/news/:pageWithNumber" element={<ViewBlogList />} />
            <Route path="/news/view/:blogSlug" element={<ViewSpecificBlog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GuestLayout>
      )}
    </div>
  );
}
