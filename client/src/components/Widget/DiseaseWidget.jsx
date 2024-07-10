import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import "components/Widget/Widget.scss";

const DiseaseWidget = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/disease`).then((res) => {
        setData(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div className="widget">
        <div className="widget__wrapper">
          <div className="widget__icon-disease">
            <MedicalServicesIcon className="icon-disease" />
          </div>
          <div>
            <span>{data.length}</span>
            <h4>Total diseases</h4>
          </div>
          <Link to="/disease-table">View</Link>
        </div>
      </div>
    </>
  );
};

export default DiseaseWidget;
