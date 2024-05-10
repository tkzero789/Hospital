import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";

export default function BlogTable({ userRole }) {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog")
      .then((res) => {
        const reverseData = res.data.reverse();
        const reverseDataWithNo = reverseData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setBlog(reverseDataWithNo);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => {
        const blog = params.row;
        return (
          <div className="cellAction">
            <NavLink className="viewLink" to={`/blog/${blog.id}/view`}>
              <div className="viewButton">Xem</div>
            </NavLink>
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "title", headerName: "Title", width: 400 },
    { field: "createdAt", headerName: "Ngày tạo", width: 120 },
    { field: "status", headerName: "Trạng thái", width: 120 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách blogs
        {(userRole === "head-doctor" || userRole === "doctor") && (
          <NavLink to="/create-blog" className="add-link">
            Thêm bài blog
          </NavLink>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={blog}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
