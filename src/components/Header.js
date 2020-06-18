import React from "react"
import { Link } from "gatsby"

import "../css/header.css"

const Header = ({ pages, activePage }) => {
  return (
    <div className="Header">
      <div className="Logo">{"{ j.sh }"}</div>
      <div className="Menu">
        {pages &&
          pages.map((page, ind) => (
            <>
              {ind > 0 && " "}
              <Link to={page === "blog" ? "" : page}>
                <span className={page === activePage && "active"}>( </span>
                {page}
                <span className={page === activePage && "active"}> )</span>
              </Link>
            </>
          ))}
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
