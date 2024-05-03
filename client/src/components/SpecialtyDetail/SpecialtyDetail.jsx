import { useParams } from "react-router-dom";

const SpecialtyDetail = () => {
  const { specialtyId } = useParams();

  const specialties = [
    {
      id: "tim-mach",
      name: "Tim mạch",
      detail:
        "Chuyên khoa Tim mạch là một ngành quan trọng thuộc khối Y học lâm sàng, giữ chức năng khám, chẩn đoán, tư vấn và điều trị các bệnh lý liên quan đến hệ thống tim mạch, cơ quan quan trọng giúp duy trì sự sống của con người.",
    },
    {
      id: "co-xuong-khop",
      name: "Cơ - xương - khớp",
      detail:
        "Các bệnh Cơ – Xương – Khớp là một nhóm bệnh thường gặp nhất trong mọi nhóm bệnh, có nguyên nhân và cơ chế bệnh sinh phức tạp, diễn tiến kéo dài liên quan đến nhiều bệnh lý nội ngoại khoa. Các bệnh Cơ – Xương – Khớp là một nhóm bệnh thường gặp nhất trong mọi nhóm bệnh, có nguyên nhân và cơ chế bệnh sinh phức tạp, diễn tiến kéo dài liên quan đến nhiều bệnh lý nội ngoại khoa.",
    },
    {
      id: "noi-tong-hop",
      name: "Nội tổng hợp",
      detail: "Nội dung về chuyên khoa",
    },
    {
      id: "rang-ham-mat",
      name: "Răng - hàm - mặt",
      detail: "Nội dung về chuyên khoa",
    },
    {
      id: "mat",
      name: "Mắt",
      detail: "Nội dung về chuyên khoa",
    },
    {
      id: "xet-nghiem",
      name: "Xét nghiệm",
      detail: "Nội dung về chuyên khoa",
    },
    {
      id: "tai-mui-hong",
      name: "Tai - mũi - họng",
      detail: "Nội dung về chuyên khoa",
    },
    {
      id: "than-kinh",
      name: "Thần kinh",
      detail: "Nội dung về chuyên khoa",
    },
  ];

  const specialty = specialties.find(
    (specialty) => specialty.id === specialtyId
  );

  return (
    <>
      <h1>{specialty.name}</h1>
      <p>{specialty.detail}</p>
    </>
  );
};

export default SpecialtyDetail;
