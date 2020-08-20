import React from "react"

import PageContainer from "../components/PageContainer"

import "../css/404.css"

const FourOhFour = () => {
  return (
    <PageContainer activePage="contact">
      <div className="FourOhFour">
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
      </div>
    </PageContainer>
  )
}

export default FourOhFour
