import React from "react"

import Header from "./Header"
import Footer from "./Footer"

export default function PageContainer({ activePage, children }) {
  return (
    <div className="container">
      <Header activePage={activePage} />
      {children}
      <Footer />
    </div>
  )
}
