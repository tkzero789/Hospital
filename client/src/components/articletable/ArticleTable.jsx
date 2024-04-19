import "./articletable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../adminArticleList";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Datatable = () => {
  const [data, setData] = useState(userRows);

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
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách bài viết
        <NavLink to="/users/new" className="link">
          Thêm bài viết
        </NavLink>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
