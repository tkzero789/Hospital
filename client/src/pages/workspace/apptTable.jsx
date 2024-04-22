import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function ApptTable({ userRole, userInfos }) {
  const [appts, setAppts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointment")
      .then((res) => {
        // Add an 'id' field to each appts object
        const apptsWithIds = res.data.map((item) => ({
          id: item._id,
          ...item,
        }));
        const reverseData = apptsWithIds.reverse();
        setAppts(reverseData);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        return (
          // need to edit here
          <div className="cellAction">
            <NavLink className="viewLink" to={`/appointment/${params.row.id}`}>
              <div className="viewButton">Xem</div>
            </NavLink>
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "phoneNumber", headerName: "SĐT", width: 120 },
    { field: "fullName", headerName: "Tên bệnh nhân", width: 180 },
    { field: "date", headerName: "Ngày đặt hẹn", width: 160 },
    { field: "need", headerName: "Nhu cầu", width: 240 },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 160,
      renderCell: (params) => {
        const parts = params.value.split("/");
        if (parts[0].length === 1) {
          parts[0] = "0" + parts[0];
        }
        return parts.join("/");
      },
    },
    { field: "email", headerName: "Email", width: 240 },
    { field: "createdAt", headerName: "Ngày khởi tạo", width: 160 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">Danh sách đặt hẹn</div>
      <DataGrid
        className="datagrid"
        rows={appts}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
