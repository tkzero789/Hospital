import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import "pages/DataTable/DataTable.scss";

export default function DiseaseTable({ userRole, userInfos }) {
  const [diseases, setDiseases] = useState([]);
  const [myDiseases, setMyDiseases] = useState(false);
  const [pageSize, setPageSize] = useState(25);

  // Fetch data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/disease/`)
      .then((res) => {
        const reverseData = res.data.reverse();
        const reverseDataWithNo = reverseData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setDiseases(reverseDataWithNo);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  // Assign disease priority
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

  // Sort diseases based on status priority
  const sortedDiseases = [...diseases].sort(
    (a, b) => getPriority(a.status) - getPriority(b.status)
  );

  // Filter diseases
  const handleMyDiseaseClick = () => {
    setMyDiseases(!myDiseases);
  };

  // Display filtered diseases
  const displayedDiseases = myDiseases
    ? sortedDiseases.filter(
        (b) => b.createInfos.doctorID === userInfos.doctorID
      )
    : sortedDiseases;

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "header-style",
      flex: 1,
      renderCell: (params) => {
        const disease = params.row;
        return (
          <div className="cellAction">
            {disease.status === "Approved" && (
              <NavLink className="viewLink" to={`/disease/view/${disease.id}`}>
                <div className="viewButton">View</div>
              </NavLink>
            )}
            {disease.status !== "Approved" && (
              <NavLink className="viewLink" to={`/disease/view/${disease.id}`}>
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
      field: "name",
      headerName: "Disease",
      headerClassName: "header-style",
      width: 400,
    },
    {
      field: "medSpecialty",
      headerName: "Specialty",
      headerClassName: "header-style",
      width: 160,
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
      headerName: "DoctorID",
      headerClassName: "header-style",
      width: 120,
      valueGetter: (params) => params.row.createInfos.doctorID,
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
          <title>Disease list</title>
        </Helmet>
      </HelmetProvider>
      <div className="datatable">
        <div className="datatableTitle">
          List of diseases
          {userRole === "head-doctor" && (
            <>
              <button onClick={handleMyDiseaseClick}>
                <i className="bi bi-filter"></i>
                <span className="ps-2">
                  {myDiseases ? "All diseases" : "Diseases created by me"}
                </span>
              </button>
            </>
          )}
          {userRole === "head-doctor" && (
            <NavLink to="/disease/create" className="add-link">
              <i className="bi bi-plus-circle"></i>
              <span className="ps-2">Add a disease</span>
            </NavLink>
          )}
        </div>
        <DataGrid
          className="datagrid"
          rows={displayedDiseases}
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
