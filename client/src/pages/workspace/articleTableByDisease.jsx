import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function ArticleTableByDisease({ userRole, userInfos }) {
  const [diseaseName, setDiseaseName] = useState("");
  const [articles, setArticles] = useState([]);
  const [tempArticles, setTempArticles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const { diseaseId } = useParams();

  // get disease from DB by diseaseId
  useEffect(() => {
    setIsProcessing(true);
    axios
      .get(`http://localhost:5000/disease/${diseaseId}`)
      .then((res) => {
        const dbdisease = res.data;
        setDiseaseName(dbdisease.name);
        getArticles(dbdisease);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseaseId]);

  // get articles from DB by diseaseId
  function getArticles(disease) {
    const articleIds = disease.relatedArticles.map((article) => article.id);
    axios
      .post(`http://localhost:5000/article/by-ids`, { ids: articleIds })
      .then((res) => {
        if (res.data.length > 0) {
          setArticles(res.data);
        }
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    setIsProcessing(false);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/article-temp/`)
      .then((res) => {
        const articles = res.data;
        setTempArticles(
          articles.filter((article) => article.diseaseId === diseaseId)
        );
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseaseId]);

  const flatData = [...tempArticles, ...articles].map((item, index) => {
    const createInfos = item.createInfos || {};
    return {
      ...item,
      doctorCreated: createInfos.doctorCreated || "",
      doctorID: createInfos.doctorID || "",
      timeCreated: createInfos.timeCreated || "",
      number: index + 1,
    };
  });

  const doctorFlatData = flatData
    .filter((item) => item.medSpecialty === userInfos.medSpecialty)
    .map((item, index) => ({ ...item, number: index + 1 }));

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => {
        const article = params.row;
        return (
          <div className="cellAction">
            {article.status === "Approved" && (
              <NavLink
                className="viewLink"
                to={`/disease/${article.diseaseId}/article/${article.id}/view`}
              >
                <div className="viewButton">Xem</div>
              </NavLink>
            )}

            {article.status === "Approved" &&
              userInfos.doctorID === params.row.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/disease/${article.diseaseId}/article/${article.id}/edit`}
                >
                  <div className="viewButton">Sửa</div>
                </NavLink>
              )}
            {article.status !== "Approved" &&
              userInfos.doctorID === params.row.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/disease/${article.diseaseId}/article-temp/${article.id}/approve`}
                >
                  <div className="viewButton">Xem</div>
                </NavLink>
              )}
            {article.status !== "Approved" && userRole === "head-doctor" && (
              <NavLink
                className="viewLink"
                to={`/disease/${article.diseaseId}/article-temp/${article.id}/approve`}
              >
                <div className="viewButton">Xét duyệt</div>
              </NavLink>
            )}
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "Stt", width: 50 },
    { field: "id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Tựa đề", width: 300 },
    { field: "diseaseName", headerName: "Bệnh đi kèm", width: 200 },
    { field: "doctorCreated", headerName: "Tác giả", width: 180 },
    { field: "doctorID", headerName: "Mã số bác sĩ", width: 120 },
    { field: "timeCreated", headerName: "Ngày viết", width: 160 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách bài viết
        {userRole !== "admin" && (
          <NavLink
            to={`/disease/${diseaseId}/article/create`}
            className="add-link"
          >
            Thêm bài viết
          </NavLink>
        )}
      </div>
      {userRole === "admin" && (
        <DataGrid
          className="datagrid"
          rows={flatData}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      )}
      {userRole !== "admin" && (
        <DataGrid
          className="datagrid"
          rows={doctorFlatData}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      )}
    </div>
  );
}
