import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import "pages/DataTable/DataTable.scss";

export default function SymptomTable({ userRole, userInfos }) {
  const [symptoms, setSymptoms] = useState([]);
  const [mySymptoms, setMySymptoms] = useState(false);
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom/`)
      .then((res) => {
        const symptomsData = res.data.reverse();
        const symptomsDataWithNo = symptomsData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setSymptoms(symptomsDataWithNo);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  // Assign symptom priority
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

  // Sort symptoms based on status priority
  const sortedSymptoms = [...symptoms].sort(
    (a, b) => getPriority(a.status) - getPriority(b.status)
  );

  // Filter symptoms
  const handleMySymptomClick = () => {
    setMySymptoms(!mySymptoms);
  };

  // Display filtered diseases
  const displayedSymptoms = mySymptoms
    ? sortedSymptoms.filter(
        (b) => b.createInfos.doctorID === userInfos.doctorID
      )
    : sortedSymptoms;

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "header-style",
      flex: 1,
      renderCell: (params) => {
        const symptom = params.row;
        return (
          <div className="cellAction">
            <NavLink className="viewLink" to={`/symptom/${symptom.id}/view`}>
              <div className="viewButton">View</div>
            </NavLink>
            {symptom.status === "Request Edit" &&
              userRole === "head-doctor" && (
                <NavLink
                  className="viewLink"
                  to={`/symptom/${symptom.id}/edit`}
                >
                  <div className="editButton">Edit</div>
                </NavLink>
              )}
            {(symptom.status === "Pending Create" ||
              symptom.status === "Pending Update") &&
              userRole === "admin" && (
                <NavLink
                  className="viewLink"
                  to={`/symptom/approve/${symptom.id}`}
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
    {
      field: "number",
      headerName: "No.",
      headerClassName: "header-style",
      width: 80,
    },
    {
      field: "name",
      headerName: "Symptom",
      headerClassName: "header-style",
      width: 240,
    },
    {
      field: "position",
      headerName: "Position",
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
          <title>Symptoms list</title>
        </Helmet>
      </HelmetProvider>
      <div className="datatable">
        <div className="datatableTitle">
          List of symptoms
          {userRole === "head-doctor" && (
            <>
              <button onClick={handleMySymptomClick}>
                <i className="bi bi-filter"></i>
                <span className="ps-2">
                  {mySymptoms ? "All symptoms" : "Symptoms created by me"}
                </span>
              </button>
            </>
          )}
          {userRole === "head-doctor" && (
            <NavLink to="/symptom/create" className="add-link">
              <i className="bi bi-plus-circle"></i>
              <span className="ps-2">Add symptom</span>
            </NavLink>
          )}
        </div>
        <DataGrid
          className="datagrid"
          rows={displayedSymptoms}
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
