import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import "components/Widget/Widget.scss";

const UserWidget = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`).then((res) => {
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
          <div className="widget__icon-user">
            <PeopleIcon className="icon-user" />
          </div>
          <div>
            <span>{data.length}</span>
            <h4>Total users</h4>
          </div>
          <Link to="/user-table">View</Link>
        </div>
      </div>
    </>
  );
};

export default UserWidget;
