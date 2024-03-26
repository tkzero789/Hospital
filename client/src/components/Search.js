import React from "react";
import { NavLink } from "react-router-dom";

export default function Search() {
  return (
    <>
      {/* SEARCH BUTTON */}
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm bài viết, trợ giúp"
          name=""
        />
        <div className="search-icon-wrapper">
          <NavLink href="#" class="search-icon-link">
            <i className="search-icon bi bi-search"></i>
          </NavLink>
        </div>
      </div>
    </>
  );
}
