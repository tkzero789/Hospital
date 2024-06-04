import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function DiseaseTable({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const [part, setPart] = useState(1);
  const [diseases, setDiseases] = useState([]);
  const [tempDiseases, setTempDiseases] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/`)
      .then((res) => {
        const diseases = res.data;
        setDiseases(diseases);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  const flatData = [...tempDiseases, ...diseases].map((item, index) => {
    const createInfos = item.createInfos || {};
    return {
      ...item,
      doctorCreated: createInfos?.doctorCreated || "",
      doctorID: createInfos.doctorID || "",
      timeCreated: createInfos?.timeCreated || "",
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
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Disease", width: 200 },
    { field: "medSpecialty", headerName: "Specialty", width: 160 },
    { field: "doctorCreated", headerName: "Created by", width: 180 },
    { field: "doctorID", headerName: "Doctor ID", width: 120 },
    { field: "timeCreated", headerName: "Created on", width: 160 },
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
          {userRole === "head-doctor" && part === 1 && (
            <button type="button" onClick={() => setPart(2)}>
              Diseases created by me
            </button>
          )}
          {userRole === "head-doctor" && part === 2 && (
            <button type="button" onClick={() => setPart(1)}>
              All diseases
            </button>
          )}
          {userRole === "head-doctor" && (
            <NavLink to="/disease/create" className="add-link">
              Add a disease
            </NavLink>
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
        {(userRole === "head-doctor" || userRole === "doctor") &&
          part === 1 && (
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
        {userRole === "head-doctor" && part === 2 && (
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
