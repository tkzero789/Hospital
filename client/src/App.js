import React, { useContext } from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";
// We import all the pages we need in our app
import Navbar from "./components/NavBar";
import RequireAuth from "./RequireAuth";
import CreateSymptom from "./pages/createSymptom";
import NewSymptom from "./pages/newSymptom";
import EditSymptom from "./pages/editSymptom";
import CreateAritcle from "./pages/createArticle";
import SymptomChecker from "./pages/symptomChecker";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import SignupDoctor from "./pages/signupDoctor";
const App = () => {
  const { getUserRole } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-doctor" element={<SignupDoctor />} />
        <Route path="/signin" element={<Signin />} />
        <Route exact path="/" element={<CreateSymptom />} />
        <Route
          path="/create-symptom"
          element={
            <RequireAuth
              userRole={getUserRole()}
              allowedRoles={["doctor", "admin"]}
            >
              <CreateSymptom />
            </RequireAuth>
            // <CreateSymptom />
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
            // <NewSymptom />
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
            // <EditSymptom />
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
            // <CreateAritcle />
          }
        />
      </Routes>
    </div>
  );
};
export default App;
