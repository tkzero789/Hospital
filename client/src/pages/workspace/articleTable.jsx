import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./table.scss";

export default function ArticleTable({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const [part, setPart] = useState(1);
  const [articles, setArticles] = useState([]);
  const [tempArticles, setTempArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/`)
      .then((res) => {
        const articles = res.data;
        setArticles(articles);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/article-temp/`, apiConfig)
      .then((res) => {
        const articles = res.data;
        setTempArticles(articles);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  const flatData = [...tempArticles, ...articles].map((item, index) => {
    const createInfos = item.createInfos || {};
    return {
      ...item,
      doctorCreated: createInfos.doctorCreated || "",
      doctorID: createInfos.doctorID || "",
      timeCreated: createInfos.timeCreated || "",
      number: index + 1,
    };
  });

  const doctorFlatData = flatData
    .filter((item) => item.medSpecialty === userInfos.medSpecialty)
    .map((item, index) => ({ ...item, number: index + 1 }));

  const doctorOwnFlatData = doctorFlatData
    .filter((item) => item.createInfos.doctorID === userInfos.doctorID)
    .map((item, index) => ({ ...item, number: index + 1 }));

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const article = params.row;
        return (
          <div className="cellAction">
            {article.status === "Approved" && (
              <NavLink
                className="viewLink"
                to={`/disease/${article.diseaseId}/article/${article.id}/view`}
              >
                <div className="viewButton">View</div>
              </NavLink>
            )}
            {article.status === "Approved" &&
              userInfos.doctorID === params.row.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/disease/${article.diseaseId}/article/${article.id}/edit`}
                >
                  <div className="editButton">Edit</div>
                </NavLink>
              )}
            {article.status !== "Approved" &&
              userInfos.doctorID === params.row.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/article-temp/${article.idTemp}/approve`}
                >
                  <div className="viewButton">View</div>
                </NavLink>
              )}
            {article.status !== "Approved" && userRole === "head-doctor" && (
              <NavLink
                className="viewLink"
                to={`/article-temp/${article.idTemp}/approve`}
              >
                <div className="checkButton">Approve</div>
              </NavLink>
            )}
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "No.", width: 50 },
    { field: "id", headerName: "ID", width: 80 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "diseaseName", headerName: "Disease", width: 200 },
    { field: "doctorCreated", headerName: "Created by", width: 180 },
    { field: "doctorID", headerName: "Doctor ID", width: 120 },
    { field: "timeCreated", headerName: "Created on", width: 160 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ].concat(actionColumn);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Articles list</title>
        </Helmet>
      </HelmetProvider>
      <div className="datatable">
        <div className="datatableTitle">
          List of articles
          {userRole !== "admin" && part === 1 && (
            <button type="button" onClick={() => setPart(2)}>
              My articles
            </button>
          )}
          {userRole !== "admin" && part === 2 && (
            <button type="button" onClick={() => setPart(1)}>
              All articles
            </button>
          )}
        </div>
        {userRole === "admin" && (
          <DataGrid
            className="datagrid"
            rows={flatData}
            getRowId={(row) => row._id}
            getRowClassName={(params) =>
              `rowWithStatus ${params.row.status.replace(" ", "-")}`
            }
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "transparent",
                boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              },
            }}
          />
        )}
        {userRole !== "admin" && part === 1 && (
          <DataGrid
            className="datagrid"
            rows={doctorFlatData}
            getRowId={(row) => row._id}
            getRowClassName={(params) =>
              `rowWithStatus ${params.row.status.replace(" ", "-")}`
            }
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "transparent",
                boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              },
            }}
          />
        )}
        {userRole !== "admin" && part === 2 && (
          <DataGrid
            className="datagrid"
            rows={doctorOwnFlatData}
            getRowId={(row) => row._id}
            getRowClassName={(params) =>
              `rowWithStatus ${params.row.status.replace(" ", "-")}`
            }
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "transparent",
                boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              },
            }}
          />
        )}
      </div>
    </>
  );
}
