import React from "react"
import { Link } from "gatsby"

import "../css/header.css"

const Header = ({ pages, activePage }) => {
  return (
    <div className="Header">
      <div className="Logo">{"{ j.sh }"}</div>
      <div className="Menu">
        {pages &&
          pages.map(page =>
            page === "blog" ? (
              <Link to="/">( {page} )</Link>
            ) : (
              <Link to={page}>( {page} )</Link>
            )
          )}
      </div>

      {/*
        // Light/Dark mode
        <button
          style={{
            fontSize: "24px",
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "grey",
          }}
        >
          {isLightMode ? "☾" : "*"}
        </button>
      */}
    </div>
  )
}

export default Header
