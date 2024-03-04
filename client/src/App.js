import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
// We import all the pages we need in our app
import Navbar from "./pages/navbar";
import CreateSymptom from "./pages/createSymptom";
import NewSymptom from "./pages/newSymptom";
import EditSymptom from "./pages/editSymptom";
import CreateAritcle from "./pages/createArticle";
import SymptomChecker from "./pages/symptomChecker";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<CreateSymptom />} />
        <Route path="/create-symptom" element={<CreateSymptom />} />
        <Route path="/new-symptom" element={<NewSymptom />} />
        <Route path="/edit-symptom/:id" element={<EditSymptom />} />
        <Route path="/create-article" element={<CreateAritcle />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
};
export default App;
