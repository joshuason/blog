import React from "react"
import { Link } from "gatsby"

const Header = ({ pages, activePage }) => {
  return (
    <div className="Header">
      {pages && pages.map(page => <Link to={page}>( {page} )</Link>)}

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
