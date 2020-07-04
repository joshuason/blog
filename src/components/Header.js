import React from "react"
import { Link } from "gatsby"

import "../css/header.css"

const Header = ({ pages, activePage }) => {
  return (
    <div className="Header">
      <div className="Logo">
        <Link to={`/`}>{"{ j.sh }"}</Link>
      </div>
      {/* Change below to use nav > ul > li */}
      <div className="Menu">
        {pages &&
          pages.map((page, ind) => (
            <React.Fragment key={page}>
              {ind > 0 && " "}
              <Link
                to={page === "blog" ? `/` : `/${page}`}
                className={page === activePage ? "active" : undefined}
              >
                <span>( </span>
                {page}
                <span> )</span>
              </Link>
            </React.Fragment>
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
