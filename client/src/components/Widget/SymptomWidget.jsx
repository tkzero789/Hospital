import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import "components/Widget/Widget.scss";

const SymptomWidget = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/symptom`).then((res) => {
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
          <div className="widget__icon-symptom">
            <MonitorHeartIcon className="icon-symptom" />
          </div>
          <div>
            <span>{data.length}</span>
            <h4>Total symptoms</h4>
          </div>
          <Link to="/symptom-table">View</Link>
        </div>
      </div>
    </>
  );
};

export default SymptomWidget;
