import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./table.scss";

export default function ArticleTable({ userRole, userInfos }) {
  const [articles, setArticles] = useState([]);
  const [myArticles, setMyArticles] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/`)
      .then((res) => {
        const articleData = res.data;
        const articleDataWithNo = articleData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setArticles(articleDataWithNo);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  // Assign article priority
  const getPriority = (status) => {
    switch (status) {
      case "Request Edit":
        return 1;
      case "Pending Create":
        return 2;
      case "Pending Update":
        return 3;
      default:
        return 4;
    }
  };

  // Sort articles based on status priority
  const sortedArticles = [...articles].sort(
    (a, b) => getPriority(a.status) - getPriority(b.status)
  );

  // Filter articles
  const handleMyArticleClick = () => {
    setMyArticles(!myArticles);
  };

  // Display filtered articles
  const displayedArticles = myArticles
    ? sortedArticles.filter(
        (b) => b.createInfos.doctorID === userInfos.doctorID
      )
    : sortedArticles;

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
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "No.", width: 80 },
    { field: "title", headerName: "Title", width: 300 },
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
        <div className="datatableTitle">
          List of articles
          {(userRole === "head-doctor" || userRole === "doctor") && (
            <>
              <button onClick={handleMyArticleClick}>
                {myArticles ? "All articles" : "My articles"}
              </button>
            </>
          )}
        </div>

        <DataGrid
          className="datagrid"
          rows={displayedArticles}
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
