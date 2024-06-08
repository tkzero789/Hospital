import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./table.scss";

export default function BlogTable({ userRole, userInfos }) {
  const [blog, setBlog] = useState([]);
  const [myBlog, setMyBlog] = useState(false);

  // Fetch all blogs data
  useEffect(() => {
    axios
      .get("http://localhost:5000/blog")
      .then((res) => {
        const blogData = res.data;
        const blogDataWithNo = blogData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setBlog(blogDataWithNo);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  // Assign blog priority
  const getPriority = (status) => {
    switch (status) {
      case "Request Edit":
        return 1;
      case "Pending Create":
        return 2;
      case "Accepted":
        return 3;
      default:
        return 4;
    }
  };

  // Sort blogs based on status priority
  const sortedBlogs = [...blog].sort(
    (a, b) => getPriority(a.status) - getPriority(b.status)
  );

  // Filter blogs
  const handleMyBlogClick = () => {
    setMyBlog(!myBlog);
  };

  // Display filtered blogs
  const displayedBlogs = myBlog
    ? sortedBlogs.filter((b) => b.doctorID === userInfos.doctorID)
    : sortedBlogs;

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const blog = params.row;
        return (
          <div className="cellAction">
            <NavLink className="viewLink" to={`/blog/${blog.id}/view`}>
              <div className="viewButton">View</div>
            </NavLink>
          </div>
        );
      },
    },
  ];

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 400,
    },
    { field: "author", headerName: "Author", width: 200 },
    { field: "doctorID", headerName: "Doctor ID", width: 120 },
    { field: "createdAt", headerName: "Created on", width: 150 },

    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        const status = params.row.status.replace(" ", "-");
        return (
          <div className={`cellWithStatus ${status}`}>{params.row.status}</div>
        );
      },
    },
  ].concat(actionColumn);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Blogs</title>
        </Helmet>
      </HelmetProvider>
      <div className="datatable">
        <div className="datatableTitle">
          List of blogs
          {(userRole === "head-doctor" || userRole === "doctor") && (
            <>
              <button onClick={handleMyBlogClick}>
                {myBlog ? "All blogs" : "My blogs"}
              </button>
              <NavLink to="/create-blog" className="add-link">
                Create a blog
              </NavLink>
            </>
          )}
        </div>
        <DataGrid
          className="datagrid"
          rows={displayedBlogs}
          getRowId={(row) => row._id}
          getRowClassName={(params) =>
            `rowWithStatus ${params.row.status.replace(" ", "-")}`
          }
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            },
          }}
        />
      </div>
    </>
  );
}
