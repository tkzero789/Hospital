import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function DiseaseTable({ userRole, userInfos }) {
  const [diseases, setDiseases] = useState([]);
  const [myDiseases, setMyDiseases] = useState(false);

  // Fetch data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/`)
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
      width: 200,
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
    { field: "number", headerName: "No.", width: 50 },
    { field: "name", headerName: "Disease", width: 400 },
    { field: "medSpecialty", headerName: "Specialty", width: 160 },
    {
      field: "doctorCreated",
      headerName: "Created by",
      width: 180,
      valueGetter: (params) => params.row.createInfos.doctorCreated,
    },
    {
      field: "doctorID",
      headerName: "DoctorID",
      width: 120,
      valueGetter: (params) => params.row.createInfos.doctorID,
    },
    {
      field: "timeCreated",
      headerName: "Created on",
      width: 180,
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
          <title>Disease list</title>
        </Helmet>
      </HelmetProvider>
      <div className="datatable">
        <div className="datatableTitle">
          List of diseases
          {(userRole === "head-doctor" || userRole === "doctor") && (
            <>
              <button onClick={handleMyDiseaseClick}>
                {myDiseases ? "All diseases" : "Diseases created by me"}
              </button>
            </>
          )}
          {userRole === "head-doctor" && (
            <NavLink to="/disease/create" className="add-link">
              Add a disease
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
