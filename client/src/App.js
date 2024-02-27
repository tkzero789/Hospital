import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
// We import all the pages we need in our app
import Navbar from "./pages/navbar";
import RecordList from "./pages/recordList";
import Edit from "./pages/edit";
import Create from "./pages/create";
import CreateSymptom from "./pages/createSymptom";
import NewSymptom from "./pages/newSymptom";
import EditSymptom from "./pages/editSymptom";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create-symptom" element={<CreateSymptom />} />
        <Route path="/new-symptom" element={<NewSymptom />} />
        <Route path="/edit-symptom/:id" element={<EditSymptom />} />
      </Routes>
    </div>
  );
};
export default App;
