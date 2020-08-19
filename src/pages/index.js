import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import favicon from "../images/favicon-32x32.png"

import Header from "../components/Header"
import Body from "../components/Body"
import Footer from "../components/Footer"

import "../css/index.scss"

export default function Index({ data }) {
  const { edges: posts } = data.allMdx

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>j.sh – bl.g</title>
        <link rel="icon" href={favicon} />
        <script
          src="https://kit.fontawesome.com/dc5c29d233.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
      <Header pages={["blog", "about", "contact"]} activePage="blog" />
      <Body posts={posts} />
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
            blurb
            date(formatString: "MMM DD, YYYY")
            path
          }
          excerpt(pruneLength: 250)
        }
      }
    }
  }
`
