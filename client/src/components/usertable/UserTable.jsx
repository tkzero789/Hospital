import "./usertable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";

const Datatable = () => {
  const [data, setData] = useState([]);
  const { getUserRole } = useAuth();
  const userRole = getUserRole();
  const isDoctor = userRole === "head-doctor" || userRole === "doctor";

  useEffect(() => {
    fetch("http://localhost:5000/user-table")
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        // Add an 'id' field to each data object
        const dataWithIds = data.map((item) => ({ id: item._id, ...item }));
        setData(dataWithIds);
        console.log(dataWithIds);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Chỉnh sửa",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <NavLink to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </NavLink>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Xoá
            </div>
          </div>
        );
      },
    },
  ];

  const flattenedData = data.map((item) => ({
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
        {!isDoctor && (
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
};

export default Datatable;
