import React from "react"
import { Link } from "gatsby"
import SignupForm from "./SignupForm"

import "../css/footer.css"

const Footer = () => {
  return (
    <div className="Footer">
      <div className="left">
        <a href="https://twitter.com/joshu_ua">
          <i class="fab fa-twitter-square"></i>
        </a>
        <br />
        <a href="https://github.com/joshuason">
          <i class="fab fa-github-square"></i>
        </a>
      </div>
      <div className="center">
        <Link to="/">Blog</Link>
        <br />
        <Link to="/about">About</Link>
        <br />
        <Link to="/">Contact</Link>
        <br />
      </div>
      <div className="right">
        A form by any other name would fill out just as sweet...
        <SignupForm />
        (form powered by Formik)
      </div>
    </div>
  )
}

export default Footer
