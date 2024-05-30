import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./table.scss";

export default function ArticleTableByDisease({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const [diseaseName, setDiseaseName] = useState("");
  const [articles, setArticles] = useState([]);
  const [tempArticles, setTempArticles] = useState([]);
  const [flatData, setFlatData] = useState([]);
  const [doctorFlatData, setDoctorFlatData] = useState([]);
  const { diseaseId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const articleRes = await axios.get(
          `http://localhost:5000/article/by-disease/${diseaseId}`
        );
        const tempArticleRes = await axios.get(
          `http://localhost:5000/article-temp/by-disease/${diseaseId}`,
          apiConfig
        );
        setArticles(articleRes.data);
        setTempArticles(tempArticleRes.data);
      } catch (err) {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      }
    }
    fetchData();
  }, [diseaseId]);

  useEffect(() => {
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
    setFlatData(flatData);
  }, [articles, tempArticles]);

  useEffect(() => {
    const doctorFlatData = flatData
      .filter((item) => item.medSpecialty === userInfos.medSpecialty)
      .map((item, index) => ({ ...item, number: index + 1 }));
    setDoctorFlatData(doctorFlatData);
  }, [flatData]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
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
                <div className="viewButton">View</div>
              </NavLink>
            )}

            {article.status === "Approved" &&
              userInfos.doctorID === params.row.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/disease/${article.diseaseId}/article/${article.id}/edit`}
                >
                  <div className="viewButton">Edit</div>
                </NavLink>
              )}
            {article.status !== "Approved" &&
              userInfos.doctorID === params.row.createInfos.doctorID && (
                <NavLink
                  className="viewLink"
                  to={`/article-temp/${article.idTemp}/approve`}
                >
                  <div className="viewButton">View</div>
                </NavLink>
              )}
            {article.status !== "Approved" && userRole === "head-doctor" && (
              <NavLink
                className="viewLink"
                to={`/article-temp/${article.idTemp}/approve`}
              >
                <div className="viewButton">Approve</div>
              </NavLink>
            )}
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "No.", width: 50 },
    { field: "id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "diseaseName", headerName: "Disease", width: 200 },
    { field: "doctorCreated", headerName: "Created by", width: 180 },
    { field: "doctorID", headerName: "Doctor ID", width: 120 },
    { field: "timeCreated", headerName: "Created on", width: 160 },
  ].concat(actionColumn);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Articles by diseases list</title>
        </Helmet>
      </HelmetProvider>
      <div className="datatable">
        <div className="datatableTitle">
          Articles about {diseaseName}
          {userRole !== "admin" && (
            <NavLink
              to={`/disease/${diseaseId}/article/create`}
              className="add-link ms-auto"
            >
              Create an article
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
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "transparent",
                boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              },
            }}
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
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "transparent",
                boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              },
            }}
          />
        )}
      </div>
    </>
  );
}
