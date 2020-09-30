import React from 'react'

import Header from './Header'
import Footer from './Footer'

const PageContainer = ({ activePage, contentClassName, children }) => (
  <div className="container">
    <Header activePage={activePage} />
    <div className={`${contentClassName} content`}>{children}</div>
    <Footer />
  </div>
)

export default PageContainer
