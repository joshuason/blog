import React from "react"
import { Link } from "gatsby"
import SignupForm from "./SignupForm"

import "../css/footer.scss"

const Divider = () => (
  <div className="divider">
    <div className="line"></div>
    <a href="# ">
      <span className="caret-symbol">^</span>
      <span className="text-top">top</span>
    </a>
  </div>
)

const Socials = () => (
  <div className="Socials">
    <a href="https://twitter.com/joshu_ua">
      <i className="fab fa-twitter-square"></i>
    </a>
    <a href="https://github.com/joshuason">
      <i className="fab fa-github-square"></i>
    </a>
    <i className="fas fa-heart"></i>
  </div>
)

const SiteLinks = () => (
  <div className="SiteLinks">
    <Link to={"/"}>Blog</Link>
    <Link to={"/about"}>About</Link>
    <Link to={"/contact"}>Contact</Link>
  </div>
)

const Form = () => (
  <div className="Form">
    <div className="form-text">
      A form by any other name would fill out just as sweet...
    </div>
    <SignupForm />
  </div>
)

const Footer = () => (
  <div className="Footer">
    <Divider />
    <div className="content">
      <Socials />
      <span className="slash">{" / "}</span>
      <SiteLinks />
      <span className="slash">{" / "}</span>
      <Form />
    </div>
  </div>
)

export default Footer
