import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function ArticleTableByDise({ userRole, userInfos }) {
  const [diseaseName, setDiseaseName] = useState("");
  const [articles, setArticles] = useState([]);
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
  const getArticles = (disease) => {
    const articleIds = disease.relatedArticles.map((article) => article.id);
    console.log(articleIds);
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
  };

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
      <div className="datatableTitle">
        Danh sách bài viết về bệnh {diseaseName}
      </div>
      {isProcessing ? (
        <p>Đang tải bài viết...</p>
      ) : (
        <DataGrid
          className="datagrid"
          rows={flattenedData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      )}
    </div>
  );
}
