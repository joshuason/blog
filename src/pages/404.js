import React from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"

import "../css/404.css"

const FourOhFour = () => {
  return (
    <div className="FourOhFour">
      <Header pages={["blog", "about", "contact"]} />
      <div className="content">
        Oh, this is awkward...
        <br />
        <span>
          maybe <br />
          just maybe
          <br />
          it's a sign
          <br />
          to <i>not</i>
          <br />
          <a href="mailto:joshuawritescode@gmail.com">contact me...</a>
        </span>
      </div>
      <Footer />
    </div>
  )
}

export default FourOhFour
