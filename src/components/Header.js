import React from "react"
import { Link } from "gatsby"

import "../css/header.scss"

const pages = ["blog", "about", "contact"]

const Nav = ({ activePage }) => (
  <nav>
    <ul>
      {pages &&
        pages.map((page, ind) => (
          <li key={page}>
            {ind > 0 && " "}
            <Link to={page === "blog" ? `/` : `/${page}`}>
              <span className={page === activePage ? "active" : undefined}>
                ({" "}
              </span>
              {page}
              <span className={page === activePage ? "active" : undefined}>
                {" "}
                )
              </span>
            </Link>
          </li>
        ))}
    </ul>
  </nav>
)

const Header = ({ activePage }) => (
  <div className="Header">
    <div className="Logo">
      <Link to={`/`}>{"{ j.sh }"}</Link>
    </div>
    <Nav activePage={activePage} />
  </div>
)

export default Header

/*
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
*/
