import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import "pages/workspace/table.scss";

export default function UserTable({ userRole, userInfos }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user")
      .then((res) => {
        // Add an 'id' field to each users object
        const usersWithIds = res.data.map((item) => ({
          id: item._id,
          ...item,
        }));
        setUsers(usersWithIds);
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
        return (
          // need to edit here

          <div className="cellAction">
            <NavLink className="viewLink" to={`/user/${params.row.id}/view`}>
              <div className="viewButton">View</div>
            </NavLink>
          </div>
        );
      },
    },
  ];

  const flattenedData = users.map((item, index) => ({
    ...item,
    number: index + 1,
    doctorID: item.userInfos ? item.userInfos.doctorID : "",
    fullName: item.userInfos ? item.userInfos.fullName : "",
    medSpecialty: item.userInfos ? item.userInfos.medSpecialty : "",
    dob: item.userInfos ? item.userInfos.dob : "",
    gender: item.userInfos ? item.userInfos.gender : "",
  }));

  const columns = [
    { field: "number", headerName: "No.", width: 80 },
    { field: "id", headerName: "ID", width: 160 },
    { field: "fullName", headerName: "Name", width: 160 },
    { field: "phoneNumber", headerName: "Phone number", width: 140 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "role", headerName: "Role", width: 120 },
    { field: "doctorID", headerName: "Doctor ID", width: 120 },
    { field: "medSpecialty", headerName: "Specialty", width: 200 },
  ].concat(actionColumn);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Accounts list</title>
        </Helmet>
      </HelmetProvider>
      <div className="datatable">
        <div className="datatableTitle">
          List of acconts
          {userRole === "admin" && (
            <NavLink to="/signup-doctor" className="add-link ms-auto">
              Add an account
            </NavLink>
          )}
        </div>
        <DataGrid
          className="datagrid"
          rows={flattenedData}
          getRowId={(row) => row._id}
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
