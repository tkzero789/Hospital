import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import "pages/DataTable/DataTable.scss";

export default function ArticleTable({ userRole, userInfos }) {
  const [articles, setArticles] = useState([]);
  const [myArticles, setMyArticles] = useState(false);
  const [pageSize, setPageSize] = useState(25);

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
      case "Edit Requested":
        return 1;
      case "Awaiting Review":
        return 2;
      case "Updated Revision":
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
      headerClassName: "header-style",
      flex: 1,
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
    {
      field: "number",
      headerName: "No.",
      headerClassName: "header-style",
      width: 80,
    },
    {
      field: "title",
      headerName: "Title",
      headerClassName: "header-style",
      width: 300,
    },
    {
      field: "diseaseName",
      headerName: "Disease",
      headerClassName: "header-style",
      width: 200,
    },
    {
      field: "doctorCreated",
      headerName: "Created by",
      headerClassName: "header-style",
      width: 200,
      valueGetter: (params) => params.row.createInfos.doctorCreated,
    },
    {
      field: "doctorID",
      headerName: "Doctor ID",
      headerClassName: "header-style",
      width: 120,
      valueGetter: (params) => params.row.createInfos.doctorID,
    },
    {
      field: "timeCreated",
      headerName: "Created on",
      headerClassName: "header-style",
      width: 180,
      valueGetter: (params) => params.row.createInfos.timeCreated,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "header-style",
      width: 160,
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
                <i className="bi bi-filter"></i>
                <span className="ps-2">
                  {myArticles ? "All articles" : "My articles"}
                </span>
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[25, 50]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
              fontWeight: "500",
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.12)",
            },
            "& .css-z8fhq1-MuiDataGrid-columnHeaders": {
              backgroundColor: "#e9ecef",
            },
            "& .MuiDataGrid-columnHeaderCheckbox": {
              backgroundColor: "#e9ecef",
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        />
      </div>
    </>
  );
}
