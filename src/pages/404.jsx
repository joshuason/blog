import React from 'react'

import PageContainer from '../components/PageContainer'
import SEO from '../components/SEO'

import '../css/404.scss'

const FourOhFour = () => {
  return (
    <PageContainer activePage="" contentClassName="FourOhFour">
      <SEO title="404" />
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
    </PageContainer>
  )
}

export default FourOhFour
