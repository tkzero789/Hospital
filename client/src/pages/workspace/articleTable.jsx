import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./table.scss";

export default function ArticleTable({ userRole, userInfos }) {
  const [articles, setArticles] = useState([]);

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
            {article.status !== "Approved" && (
              <NavLink
                className="viewLink"
                to={`/article/${article.id}/approve`}
              >
                <div className="viewButton">View</div>
              </NavLink>
            )}
            {article.status === "Request Edit" &&
              userInfos.doctorID === params.row.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/disease/${article.diseaseId}/article/${article.id}/edit`}
                >
                  <div className="editButton">Edit</div>
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
    {
      field: "doctorCreated",
      headerName: "Created by",
      width: 180,
      valueGetter: (params) => params.row.createInfos.doctorCreated,
    },
    {
      field: "doctorID",
      headerName: "Doctor ID",
      width: 120,
      valueGetter: (params) => params.row.createInfos.doctorID,
    },
    {
      field: "timeCreated",
      headerName: "Created on",
      width: 160,
      valueGetter: (params) => params.row.createInfos.timeCreated,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const status = params.row.status.replace(" ", "-");
        return (
          <div className={`cellWithStatus ${status}`}>{params.row.status}</div>
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
        <div className="datatableTitle">List of articles</div>

        <DataGrid
          className="datagrid"
          rows={articles}
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
      </div>
    </>
  );
}
