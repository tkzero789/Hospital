import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function SymptomTable({ userRole, userInfos }) {
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom/`)
      .then((res) => {
        const symptoms = res.data;
        setSymptoms(symptoms);
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
        const symptomId = params.row.id;
        return (
          <div className="cellAction">
            <NavLink className="viewLink" to={`/symptom/${symptomId}/view`}>
              <div className="viewButton">Xem</div>
            </NavLink>
            {userRole === "admin" && (
              <NavLink className="viewLink" to={`/symptom/${symptomId}/edit`}>
                <div className="viewButton">Sửa</div>
              </NavLink>
            )}
          </div>
        );
      },
    },
  ];

  const flattenedData = symptoms.map((item) => ({
    ...item,
    doctorCreated: item.createInfos ? item.createInfos.doctorCreated : "",
    doctorID: item.createInfos ? item.createInfos.doctorID : "",
    timeCreated: item.createInfos ? item.createInfos.timeCreated : "",
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 400 },
    { field: "name", headerName: "Triệu chứng", width: 300 },
    { field: "doctorCreated", headerName: "Người tạo", width: 200 },
    { field: "doctorID", headerName: "Mã số bác sĩ", width: 140 },
    { field: "timeCreated", headerName: "Ngày tạo", width: 160 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách các triệu chứng
        {userRole === "admin" && (
          <NavLink to="/symptom/create" className="add-link">
            Thêm triệu chứng
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
