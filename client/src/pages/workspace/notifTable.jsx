import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./table.scss";

export default function NotifTable({ userRole, userInfos }) {
  const [notifs, setNotifs] = useState([]);
  const doctorID = userInfos.doctorID;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/notification/${doctorID}`)
      .then((res) => {
        console.log(res.data);
        const reverseData = res.data.reverse();
        const reverseDataWithNo = reverseData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setNotifs(reverseDataWithNo);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  const flatData = notifs.map((item, index) => {
    const fromInfos = item.fromInfos || {};
    const content = item.content || {};
    return {
      ...item,
      from: fromInfos.name || "",
      medSpecialty: fromInfos.medSpecialty || "",
      contentType: content.type || "",
      detail: content.detail || "",
      number: index + 1,
    };
  });

  const actionColumn = [
    {
      field: "action",
      headerName: "Chi tiết",
      width: 100,
      renderCell: (params) => {
        const notif = params.row;
        return (
          <div className="cellAction">
            <NavLink className="viewLink" to={`${notif.content.link}`}>
              <div className="viewButton">Xem</div>
            </NavLink>
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "Stt", width: 50 },
    { field: "from", headerName: "Người gửi", width: 160 },
    { field: "medSpecialty", headerName: "Chuyên khoa", width: 160 },
    { field: "contentType", headerName: "Loại", width: 160 },
    { field: "detail", headerName: "Nội dung", width: 360 },
    { field: "status", headerName: "Trạng thái", width: 120 },
  ].concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">Thông báo</div>
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
