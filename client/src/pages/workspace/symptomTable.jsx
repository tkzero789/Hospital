import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import "./table.scss";

export default function SymptomTable({ userRole, userInfos }) {
  const [symptoms, setSymptoms] = useState([]);
  const [tempSymptoms, setTempSymptoms] = useState([]);

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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom-temp/`)
      .then((res) => {
        const tempSymptoms = res.data;
        setTempSymptoms(tempSymptoms);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  const flatData = [...tempSymptoms, ...symptoms].map((symp, index) => ({
    ...symp,
    number: index + 1,
  }));

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => {
        const symptom = params.row;
        return (
          <div className="cellAction">
            {symptom.status !== "Approved" ? (
              <NavLink
                className="viewLink"
                to={`/symptom-temp/${symptom.id}/view`}
              >
                <div className="viewButton">Xem</div>
              </NavLink>
            ) : (
              <NavLink className="viewLink" to={`/symptom/${symptom.id}/view`}>
                <div className="viewButton">Xem</div>
              </NavLink>
            )}
            {userRole === "admin" && symptom.status === "Approved" && (
              <NavLink className="viewLink" to={`/symptom/${symptom.id}/edit`}>
                <div className="viewButton">Sửa</div>
              </NavLink>
            )}
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "Stt", width: 100 },
    { field: "id", headerName: "ID", width: 400 },
    { field: "name", headerName: "Triệu chứng", width: 500 },
    { field: "status", headerName: "Trạng thái", width: 160 },
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
        rows={flatData}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}