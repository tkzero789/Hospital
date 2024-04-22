import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function DiseaseTable({ userRole, userInfos }) {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/`)
      .then((res) => {
        const diseases = res.data;
        setDiseases(diseases);
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
        const diseaseId = params.row.id;
        return (
          <div className="cellAction">
            <NavLink className="viewLink" to={`/disease/${diseaseId}/view`}>
              <div className="viewButton">Xem</div>
            </NavLink>
            {userInfos.doctorID === params.row.createInfos.doctorID && (
              <NavLink className="viewLink" to={`/disease/${diseaseId}/edit`}>
                <div className="viewButton">Sửa</div>
              </NavLink>
            )}
          </div>
        );
      },
    },
  ];

  const flattenedData = diseases.map((item) => ({
    ...item,
    doctorCreated: item.createInfos ? item.createInfos.doctorCreated : "",
    doctorID: item.createInfos ? item.createInfos.doctorID : "",
    timeCreated: item.createInfos ? item.createInfos.timeCreated : "",
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Tên bệnh", width: 160 },
    {
      field: "symptoms",
      headerName: "Triệu chứng đi kèm",
      width: 200,
      valueGetter: (params) =>
        params.value.map((symptom) => symptom.name).join(", "),
    },
    { field: "medSpecialty", headerName: "Chuyên khoa", width: 160 },
    { field: "doctorCreated", headerName: "Người tạo", width: 180 },
    { field: "doctorID", headerName: "Mã số bác sĩ", width: 120 },
    { field: "timeCreated", headerName: "Ngày viết", width: 160 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách các căn bệnh
        {userRole === "head-doctor" && (
          <NavLink to="/disease/create" className="add-link">
            Thêm căn bệnh
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
}
