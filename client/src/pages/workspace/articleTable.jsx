import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function ArticleTable({ userRole, userInfos }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/`)
      .then((res) => {
        const articles = res.data;
        setArticles(articles);
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
        const articleId = params.row.id;
        const diseaseId = params.row.diseaseId;
        return (
          <div className="cellAction">
            <NavLink
              className="viewLink"
              to={`/disease/${diseaseId}/article/${articleId}/view`}
            >
              <div className="viewButton">Xem</div>
            </NavLink>
            {userInfos.doctorID === params.row.createInfos.doctorID && (
              <NavLink
                className="viewLink"
                to={`/disease/${diseaseId}/article/${articleId}/edit`}
              >
                <div className="viewButton">Sửa</div>
              </NavLink>
            )}
          </div>
        );
      },
    },
  ];

  const flattenedData = articles.map((item) => ({
    ...item,
    doctorCreated: item.createInfos ? item.createInfos.doctorCreated : "",
    doctorID: item.createInfos ? item.createInfos.doctorID : "",
    timeCreated: item.createInfos ? item.createInfos.timeCreated : "",
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Tựa đề", width: 350 },
    { field: "diseaseName", headerName: "Bệnh đi kèm", width: 200 },
    { field: "doctorCreated", headerName: "Tác giả", width: 180 },
    { field: "doctorID", headerName: "Mã số bác sĩ", width: 120 },
    { field: "timeCreated", headerName: "Ngày viết", width: 160 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">Danh sách bài viết</div>
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
