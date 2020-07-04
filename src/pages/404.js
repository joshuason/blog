import React from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"

import "../css/404.css"

const FourOhFour = () => {
  return (
    <div className="FourOhFour">
      <Header pages={["blog", "about", "contact"]} />
      <h1>
        Oh, this is awkward... <span>#awksquad</span>
      </h1>
      <Footer />
    </div>
  )
}

export default FourOhFour
