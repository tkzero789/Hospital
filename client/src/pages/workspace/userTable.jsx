import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import "./table.scss";

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
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Chỉnh sửa",
      width: 200,
      renderCell: (params) => {
        return (
          // need to edit here
          <div className="cellAction">
            <NavLink className="viewLink" to={`/user/${params.row.id}`}>
              <div className="viewButton">Xem</div>
            </NavLink>
          </div>
        );
      },
    },
  ];

  const flattenedData = users.map((item) => ({
    ...item,
    doctorID: item.userInfos ? item.userInfos.doctorID : "",
    fullName: item.userInfos ? item.userInfos.fullName : "",
    medSpecialty: item.userInfos ? item.userInfos.medSpecialty : "",
    dob: item.userInfos ? item.userInfos.dob : "",
    gender: item.userInfos ? item.userInfos.gender : "",
  }));

  const columns = [
    { field: "doctorID", headerName: "ID", width: 80 },
    { field: "role", headerName: "Chức danh", width: 120 },
    { field: "fullName", headerName: "Họ tên", width: 200 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "medSpecialty", headerName: "Chuyên khoa", width: 200 },
    { field: "phoneNumber", headerName: "SĐT", width: 140 },
    { field: "dob", headerName: "Ngày sinh", width: 140 },
    { field: "gender", headerName: "Giới tinh", width: 100 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách users
        {userRole === "admin" && (
          <NavLink to="/signup" className="add-link">
            Thêm user
          </NavLink>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={flattenedData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
