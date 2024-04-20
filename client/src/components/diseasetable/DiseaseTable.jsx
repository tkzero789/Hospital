import "./diseasetable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";

const Datatable = () => {
  const [data, setData] = useState([]);
  const { getUserRole } = useAuth();
  const userRole = getUserRole();
  const isHeadDoctor = userRole === "head-doctor";

  useEffect(() => {
    fetch("http://localhost:5000/disease")
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
            <NavLink className="viewLink" to="/users/test">
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
    doctorCreated: item.createInfos ? item.createInfos.doctorCreated : "",
    doctorID: item.createInfos ? item.createInfos.doctorID : "",
    timeCreated: item.createInfos ? item.createInfos.timeCreated : "",
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Tên bệnh", width: 160 },
    {
      field: "symptoms",
      headerName: "Triệu chứng đi kèm",
      width: 200,
      valueGetter: (params) =>
        params.value.map((symptom) => symptom.name).join(", "),
    },
    { field: "medSpecialty", headerName: "Chuyên khoa", width: 160 },
    { field: "doctorCreated", headerName: "Được tạo bởi", width: 180 },
    { field: "doctorID", headerName: "Mã số bác sĩ", width: 100 },
    { field: "timeCreated", headerName: "Ngày tạo", width: 160 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách các căn bệnh
        {isHeadDoctor && (
          <NavLink to="/signup" className="add-link">
            Thêm căn bệnh
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
