import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import "pages/DataTable/DataTable.scss";

export default function UserTable({ userRole, userInfos }) {
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`)
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
      headerClassName: "header-style",
      flex: 1,
      renderCell: (params) => {
        return (
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
    {
      field: "number",
      headerName: "No.",
      headerClassName: "header-style",
      width: 80,
    },
    {
      field: "fullName",
      headerName: "Name",
      headerClassName: "header-style",
      width: 160,
    },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      headerClassName: "header-style",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "header-style",
      width: 240,
    },
    {
      field: "role",
      headerName: "Role",
      headerClassName: "header-style",
      width: 120,
    },
    {
      field: "doctorID",
      headerName: "Doctor ID",
      headerClassName: "header-style",
      width: 120,
    },
    {
      field: "medSpecialty",
      headerName: "Specialty",
      headerClassName: "header-style",
      width: 200,
    },
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
          List of accounts
          {userRole === "admin" && (
            <NavLink to="/signup-doctor" className="add-link ms-auto">
              <i className="bi bi-person-fill-add"></i>
              <span className="ps-2">Add an account</span>
            </NavLink>
          )}
        </div>
        <DataGrid
          className="datagrid"
          rows={flattenedData}
          getRowId={(row) => row._id}
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
