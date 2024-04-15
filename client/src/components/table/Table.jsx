import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "bài viết 1",
      date: "09/12/2024",
      status: "Approved",
      accept: "trưởng khoa",
    },
    {
      id: 2235235,
      product: "bài viết 2",
      date: "24/12/2024",
      status: "Pending",
      accept: "trưởng khoa",
    },
    {
      id: 2342353,
      product: "bài viết 3",
      date: "11/01/2024",
      status: "Pending",
      accept: "trưởng khoa",
    },
    {
      id: 2357741,
      product: "bài viết 4",
      date: "16/02/2024",
      status: "Approved",
      accept: "trưởng khoa",
    },
    {
      id: 2342355,
      product: "bài viết 5",
      date: "07/03/2024",
      status: "Pending",
      accept: "trưởng khoa",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID bài viết</TableCell>
            <TableCell className="tableCell">Tên bài viết</TableCell>
            <TableCell className="tableCell">Ngày</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
            <TableCell className="tableCell">Xem xét/chấp thuận</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.product}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
              <TableCell className="tableCell">{row.accept}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
