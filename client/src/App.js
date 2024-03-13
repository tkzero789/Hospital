import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RecordList from "./pages/recordList";
import Edit from "./pages/edit";
import Create from "./pages/create";
import CreateSymptom from "./pages/createSymptom";
import NewSymptom from "./pages/newSymptom";
import EditSymptom from "./pages/editSymptom";
import CreateAritcle from "./pages/createArticle";
import DoctorLogin from "./pages/doctorLogin";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles.css";
import "./responsive.css";
import "./base.css";
import TestHome from "./pages/testHome";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div style={{ overflow: "hidden", height: "2000px" }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={true} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test-home" element={<TestHome />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create-symptom" element={<CreateSymptom />} />
        <Route path="/new-symptom" element={<NewSymptom />} />
        <Route path="/edit-symptom/:id" element={<EditSymptom />} />
        <Route path="/create-article" element={<CreateAritcle />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/record-list" element={<RecordList />} />
      </Routes>
    </div>
  );
};
export default App;
