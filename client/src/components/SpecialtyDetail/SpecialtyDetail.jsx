import { useParams } from "react-router-dom";

const SpecialtyDetail = () => {
  const { specialtyId } = useParams();

  const specialties = [
    {
      id: "tim-mach",
      name: "Tim mạch",
      info: "Chuyên khoa Tim mạch là một ngành quan trọng thuộc khối Y học lâm sàng, giữ chức năng khám, chẩn đoán, tư vấn và điều trị các bệnh lý liên quan đến hệ thống tim mạch, cơ quan quan trọng giúp duy trì sự sống của con người.Chuyên khoa Tim mạch được phân thành các lĩnh vực Nội Tim mạch, Can thiệp tim mạch và Ngoại Tim mạch, chuyên sâu về điều trị các bệnh lý: mạch máu; van tim; cơ tim; rối loạn nhịp tim; tim bẩm sinh; tim nhiễm khuẩn,… Các phương pháp điều trị đang được áp dụng tại chuyên khoa Tim mạch Khám lâm sàng: Kiểm tra huyết áp, nghe tim, khám các dấu hiệu và triệu chứng. Xét nghiệm máu: Kiểm tra tình trạng thiếu máu, nồng độ cholesterol, đái tháo đường, suy tim,…Điện tâm đồ, siêu âm tim hiện đại 3D, 4D Xét nghiệm chuyên sâu: Holer huyết áp, điện tim, chụp cắt lớp vi tính động mạch vành, xạ hình cơ tim ",
    },
    {
      id: "co-xuong-khop",
      name: "Cơ - xương - khớp",
      info: "Các bệnh Cơ – Xương – Khớp là một nhóm bệnh thường gặp nhất trong mọi nhóm bệnh, có nguyên nhân và cơ chế bệnh sinh phức tạp, diễn tiến kéo dài liên quan đến nhiều bệnh lý nội ngoại khoa. Các bệnh Cơ – Xương – Khớp là một nhóm bệnh thường gặp nhất trong mọi nhóm bệnh, có nguyên nhân và cơ chế bệnh sinh phức tạp, diễn tiến kéo dài liên quan đến nhiều bệnh lý nội ngoại khoa.",
    },
    {
      id: "noi-tong-hop",
      name: "Nội tổng hợp",
      info: "Nội dung về chuyên khoa",
    },
    {
      id: "rang-ham-mat",
      name: "Răng - hàm - mặt",
      info: "Nội dung về chuyên khoa",
    },
    {
      id: "mat",
      name: "Mắt",
      info: "Nội dung về chuyên khoa",
    },
    {
      id: "xet-nghiem",
      name: "Xét nghiệm",
      info: "Nội dung về chuyên khoa",
    },
    {
      id: "tai-mui-hong",
      name: "Tai - mũi - họng",
      info: "Nội dung về chuyên khoa",
    },
    {
      id: "than-kinh",
      name: "Thần kinh",
      info: "Nội dung về chuyên khoa",
    },
  ];

  const specialty = specialties.find(
    (specialty) => specialty.id === specialtyId
  );

  return (
    <>
      <h1>{specialty.name}</h1>
      <p>{specialty.info}</p>
    </>
  );
};

export default SpecialtyDetail;
