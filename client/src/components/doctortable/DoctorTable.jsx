import "./doctortable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/article")
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

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "phoneNumber", headerName: "SĐT", width: 120 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách bác sĩ
        <NavLink to="/signup" className="add-link">
          Thêm bác sĩ
        </NavLink>
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
