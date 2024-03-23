import React from "react";

export default function AdminNavBar() {
  return (
    <div className="container text-center">
      <div className="row pt-3 pb-3">
        <div className="col">
          <div className="card border-dark-subtle">
            <div className="card-body">
              <h5 className="card-title text-body">Danh sách tài khoản</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card border-dark-subtle">
            <div className="card-body">
              <h5 className="card-title text-body">Danh sách bài viết</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card border-dark-subtle">
            <div className="card-body">
              <h5 className="card-title text-body">Tạo bài viết</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card border-dark-subtle">
            <div className="card-body">
              <h5 className="card-title text-body">Cập nhật lịch làm việc</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
