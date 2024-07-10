import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import FormatDate from "utilities/FormatDate";
import "pages/DataTable/DataTable.scss";

export default function ApptTable() {
  const [appts, setAppts] = useState([]);
  const [pageSize, setPageSize] = useState(25);

  // Fetch appointment data
  useEffect(() => {
    axios
      .get("http://localhost:5000/appointment")
      .then((res) => {
        const reverseData = res.data.reverse();
        const reverseDataWithNo = reverseData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setAppts(reverseDataWithNo);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  // Assign appointment priority
  const getPriority = (status) => {
    switch (status) {
      case "Reviewing":
        return 1;
      case "Accepted":
        return 2;
      case "Declined":
        return 3;
      default:
        return 4;
    }
  };

  // Sort appointments based on status priority
  const sortedAppts = [...appts].sort(
    (a, b) => getPriority(a.status) - getPriority(b.status)
  );

  // Memo
  const MemoizedFormatDate = React.memo(FormatDate);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "header-style",
      flex: 1,
      renderCell: (params) => {
        const appt = params.row;
        return (
          <div className="cellAction">
            <NavLink className="viewLink" to={`/appointment/${appt.id}/view`}>
              <div className="viewButton">View</div>
            </NavLink>
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
      field: "phoneNumber",
      headerName: "Phone number",
      headerClassName: "header-style",
      width: 160,
    },
    {
      field: "fullName",
      headerName: "Patient's name",
      headerClassName: "header-style",
      width: 200,
    },
    {
      field: "date",
      headerName: "Appointment date",
      headerClassName: "header-style",
      width: 160,
    },
    {
      field: "need",
      headerName: "Service",
      headerClassName: "header-style",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "header-style",
      width: 240,
    },
    {
      field: "createdAt",
      headerName: "Requested on",
      headerClassName: "header-style",
      width: 180,
      renderCell: (params) => {
        return <MemoizedFormatDate date={params.row.createdAt} />;
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "header-style",
      width: 160,
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
          <title>Appointments list</title>
        </Helmet>
      </HelmetProvider>
      <div className="datatable">
        <div className="datatableTitle">List of appointments</div>
        <DataGrid
          className="datagrid"
          rows={sortedAppts}
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
