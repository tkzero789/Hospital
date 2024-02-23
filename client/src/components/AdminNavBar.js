import React from "react";

export default function AdminNavBar() {
  return (
    <div className="container text-center">
      <div className="row pt-3 pb-3">
        <div className="col">
          <div className="card border-danger-subtle">
            <div className="card-body">
              <h5 className="card-title text-danger">DANH SÁCH</h5>
              <h5 className="card-title text-danger">TÀI KHOẢN</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card border-danger-subtle">
            <div className="card-body">
              <h5 className="card-title text-danger">DANH SÁCH</h5>
              <h5 className="card-title text-danger">BÀI VIẾT</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card border-danger-subtle">
            <div className="card-body">
              <h5 className="card-title text-danger">TẠO TRIỆU CHỨNG</h5>
              <h5 className="card-title text-danger">VÀ MÔ TẢ</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card border-danger-subtle">
            <div className="card-body">
              <h5 className="card-title text-danger">CẬP NHẬT</h5>
              <h5 className="card-title text-danger">LỊCH LÀM VIỆC</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
