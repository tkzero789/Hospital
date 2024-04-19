export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "article",
    headerName: "Tên bài viết",
    width: 600,
  },
  {
    field: "doctorName",
    headerName: "Được viết bởi",
    width: 230,
  },

  {
    field: "status",
    headerName: "Trạng thái",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    article: "Giữ Ngủ Ngon: Bí Quyết cho Sức Khỏe Toàn Diện",
    doctorName: "Lê Minh Quân",
    status: "active",
  },
  {
    id: 2,
    article:
      "Bản Giao Hưởng Ruột Già: Khi Hệ Vi Sinh Vật Quyết Định Sức Khỏe Toàn Diện",
    img: "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    doctorName: "Phạm Duy Bình",
    status: "passive",
  },
  {
    id: 3,
    article:
      "Tập Thể Dục Thường Xuyên: Cải Thiện Sức Khỏe Thể Chất và Tinh Thần",
    img: "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
    doctorName: "Nguyễn Mai Anh",
    status: "pending",
  },
  {
    id: 4,
    article: "Quản Lý Cân Nặng Hiệu Quả: Giữ Dáng và Khỏe Mạnh",
    img: "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
    doctorName: "Trần Ngọc Hà",
    status: "active",
  },
  {
    id: 5,
    article: "Cú Đêm Hay Chào Mõ: Giải Mã Bí Ẩn Chronotype và Tối Ưu Giấc Ngủ",
    img: "https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
    doctorName: "Mai Chí Vinh",
    status: "passive",
  },
  {
    id: 6,
    article:
      "Sương Mù Não Bộ: Hơn Cả Buồn Ngủ Chiều - Hiểu Về Nguyên Nhân & Giải Pháp cho Suy Giảm Trí Nhớ",
    img: "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
    doctorName: "Bùi Thanh Thảo",
    status: "active",
  },
  {
    id: 7,
    article:
      "Tiếng Cười Là Liều Thuốc Hay Nhất, Nhưng Tập Thể Dục Thì Sao? Khám Phá Mối Liên Hệ Giữa Hoạt Động Thể Chất và Sức Khỏe Tâm Thần",
    img: "https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
    doctorName: "Dương Văn Hiếu",
    status: "passive",
  },
  {
    id: 8,
    article: "Thiếu Ngủ Kinh Niên Ảnh Hưởng Đến Sức Khỏe Như Thế Nào",
    img: "https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
    doctorName: "Lê Anh Đức",
    status: "active",
  },
  {
    id: 9,
    article:
      "Chiến Binh Bên Trong: Sử Dụng Sức Mạnh của Hệ Miễn Dịch để Chống Lại Bệnh Tật",
    img: "https://www.shareicon.net/data/512x512/2016/07/26/802031_user_512x512.png",
    doctorName: "Lê Bảo Ngọc",
    status: "pending",
  },
  {
    id: 10,
    article: "Hiểu Về Rủi Ro và Phát Hiện Sớm Bệnh Loãng Xương",
    img: "https://www.shareicon.net/data/512x512/2016/07/26/802031_user_512x512.png",
    doctorName: "Nguyễn Vũ Ngọc Thanh",
    status: "active",
  },
  {
    id: 11,
    article:
      "Bảo Vệ Mắt và Giấc Ngủ khỏi Ánh Sáng Xanh của Thời Đại Kỹ Thuật Số",
    img: "https://www.shareicon.net/data/512x512/2016/07/26/802031_user_512x512.png",
    doctorName: "Trần Mỹ Tâm",
    status: "active",
  },
  {
    id: 12,
    article:
      "Hiểu Về Biến Động Đường Huyết và Ảnh Hưởng của Chúng đến Sức Khỏe",
    img: "https://www.shareicon.net/data/512x512/2016/07/26/802031_user_512x512.png",
    doctorName: "Võ Thị Ngọc Linh",
    status: "active",
  },
];
