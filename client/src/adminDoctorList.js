export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Tên",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Tuổi",
    width: 100,
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
    username: "Lê Minh Quân",
    img: "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    status: "active",
    email: "test@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Phạm Duy Bình",
    img: "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    email: "test@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Nguyễn Mai Anh",
    img: "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
    email: "test@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Trần Ngọc Hà",
    img: "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
    email: "test@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Mai Chí Vinh",
    img: "https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
    email: "test@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Bùi Thanh Thảo",
    img: "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
    email: "test@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Dương Văn Hiếu",
    img: "https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
    email: "test@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Lê Anh Đức",
    img: "https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
    email: "test@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Lê Bảo Ngọc",
    img: "https://www.shareicon.net/data/512x512/2016/07/26/802031_user_512x512.png",
    email: "test@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Nguyễn Vũ Ngọc Thanh",
    img: "https://www.shareicon.net/data/512x512/2016/07/26/802031_user_512x512.png",
    email: "test@gmail.com",
    status: "active",
    age: 65,
  },
  {
    id: 11,
    username: "Trần Mỹ Tâm",
    img: "https://www.shareicon.net/data/512x512/2016/07/26/802031_user_512x512.png",
    email: "test@gmail.com",
    status: "active",
    age: 25,
  },
  {
    id: 12,
    username: "Võ Thị Ngọc Linh",
    img: "https://www.shareicon.net/data/512x512/2016/07/26/802031_user_512x512.png",
    email: "test@gmail.com",
    status: "active",
    age: 38,
  },
];
