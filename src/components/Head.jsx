import React from "react"
import { Helmet } from "react-helmet"
import favicon from "../images/favicon-32x32.png"

const Head = ({ title }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <link rel="icon" href={favicon} />
    <script
      src="https://kit.fontawesome.com/dc5c29d233.js"
      crossOrigin="anonymous"
    ></script>
  </Helmet>
)

export default Head
