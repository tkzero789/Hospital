import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import FormatDate from "utilities/FormatDate";
import "pages/DataTable/DataTable.scss";

export default function BlogTable({ userRole, userInfos }) {
  const [blog, setBlog] = useState([]);
  const [myBlog, setMyBlog] = useState(false);
  const [pageSize, setPageSize] = useState(25);

  // Fetch all blogs data
  useEffect(() => {
    axios
      .get(`https://bayside-render-server.onrender.com/blog`)
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
      case "Edit Requested":
        return 1;
      case "Awaiting Review":
        return 2;
      case "Updated Revision":
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

  // Memo
  const StatusCell = ({ status }) => {
    const formattedStatus = status.replace(" ", "-");
    return <div className={`cellWithStatus ${formattedStatus}`}>{status}</div>;
  };
  const MemoizedStatusCell = React.memo(StatusCell);
  const MemoizedFormatDate = React.memo(FormatDate);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "header-style",
      flex: 1,
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
      field: "number",
      headerName: "No.",
      headerClassName: "header-style",
      width: 80,
    },
    {
      field: "title",
      headerName: "Title",
      headerClassName: "header-style",
      width: 400,
    },
    {
      field: "tag",
      headerName: "Category",
      headerClassName: "header-style",
      width: 200,
    },
    {
      field: "author",
      headerName: "Author",
      headerClassName: "header-style",
      width: 200,
    },
    {
      field: "doctorID",
      headerName: "Doctor ID",
      headerClassName: "header-style",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Created on",
      headerClassName: "header-style",
      width: 180,
      renderCell: (params) => {
        return <MemoizedFormatDate date={params.row.createdAt} />;
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "header-style",
      width: 160,
      renderCell: (params) => <MemoizedStatusCell status={params.row.status} />,
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
                <i className="bi bi-filter"></i>
                <span className="ps-2">
                  {myBlog ? "All blogs" : "My blogs"}
                </span>
              </button>
              <NavLink to="/create-blog" className="add-link">
                <i className="bi bi-plus-circle"></i>
                <span className="ps-2">Create a blog</span>
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[25, 50]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
              fontWeight: "500",
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.12)",
            },
            "& .css-z8fhq1-MuiDataGrid-columnHeaders": {
              backgroundColor: "#e9ecef",
            },
            "& .MuiDataGrid-columnHeaderCheckbox": {
              backgroundColor: "#e9ecef",
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        />
      </div>
    </>
  );
}
