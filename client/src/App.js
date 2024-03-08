import React from "react";
// We use Route in order to define the different routes of our application
import { Navigate, Route, Routes } from "react-router-dom";
// We import all the pages we need in our app
import RecordList from "./pages/recordList";
import Edit from "./pages/edit";
import Create from "./pages/create";
import CreateSymptom from "./pages/createSymptom";
import NewSymptom from "./pages/newSymptom";
import EditSymptom from "./pages/editSymptom";
import CreateAritcle from "./pages/createArticle";
import DoctorLogin from "./pages/doctorLogin";
import Home from "./pages/home";
import "./styles.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={true} />} />
        <Route path="/home" element={<Home />} />
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
