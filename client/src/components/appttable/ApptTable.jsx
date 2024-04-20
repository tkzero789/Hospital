import "./appttable.scss";
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
    fetch("http://localhost:5000/appointment")
      .then((response) => response.json())
      .then((data) => {
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
            <NavLink className="viewLink" to={`/appointment/${params.row.id}`}>
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

  const columns = [
    { field: "phoneNumber", headerName: "SĐT", width: 120 },
    { field: "fullName", headerName: "Tên bệnh nhân", width: 180 },
    { field: "date", headerName: "Ngày đặt hẹn", width: 140 },
    { field: "need", headerName: "Nhu cầu", width: 240 },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 140,
      renderCell: (params) => {
        // Split the date by '/' and add a leading zero for date with single digit
        const parts = params.value.split("/");
        if (parts[0].length === 1) {
          parts[0] = "0" + parts[0];
        }
        return parts.join("/");
      },
    },
    { field: "email", headerName: "Email", width: 280 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách đặt hẹn
        {!isDoctor && (
          <NavLink to="/appt-request" className="add-link">
            Thêm đặt hẹn
          </NavLink>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
