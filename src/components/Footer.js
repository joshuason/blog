import React from "react"
import SignupForm from "./SignupForm"

import "../css/footer.css"

const Footer = () => {
  return (
    <div className="Footer">
      <div className="left socials"></div>
      <div className="center links"></div>
      <div className="right forms">
        A form by any other name would fill out just as sweet...
        <SignupForm />
        (form powered by Formik)
      </div>
    </div>
  )
}

export default Footer
