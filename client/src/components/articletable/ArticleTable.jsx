import "./articletable.scss";
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
    fetch("http://localhost:5000/article")
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        // Add an 'id' field to each data object
        const dataWithIds = data.map((item) => ({
          id: item._id,
          ...item,
        }));
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
    doctorCreated: item.createInfos ? item.createInfos.doctorCreated : "",
  }));

  const columns = [
    { field: "title", headerName: "Tựa đề", width: 650 },
    { field: "doctorCreated", headerName: "Tác giả", width: 180 },
    { field: "diseaseName", headerName: "Bệnh đi kèm", width: 350 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách bài viết
        {isHeadDoctor && (
          <NavLink to="/signup" className="add-link">
            Thêm bài viết
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
