import React /*, { useState }*/ from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Header from "../components/Header"
import Footer from "../components/Footer"

import "../css/index.css"
//import { array } from "prop-types"

export default function Index({ data }) {
  const { edges: posts } = data.allMdx
  // const [activeTags, setActiveTags] = useState([])
  // const [isLightMode, setLightMode] = useState(false)

  const filterOptions = post => {
    // if (!activeTags.length) {
    //   return post.node.frontmatter.title.length > 0
    // } else if (post.node.frontmatter.tags) {
    //   return activeTags.every(val => post.node.frontmatter.tags.includes(val))
    // } else {
    //   return false
    // }
    return true
  }

  const body = posts
    .filter(post => filterOptions(post))
    .map(({ node: post }, ind, arr) => (
      <React.Fragment key={post.frontmatter.date}>
        {ind === 0 ||
        (ind > 0 &&
          post.frontmatter.date.slice(0, 3) !==
            arr[ind - 1].node.frontmatter.date.slice(0, 3)) ? (
          <div className="blog-post-month-divider">
            <div className="month">{post.frontmatter.date.slice(0, 3)}</div>
            <div className="slash">/</div>
            <div className="line">
              <div></div>
            </div>
          </div>
        ) : null}
        <div className="blog-post-preview" key={post.id}>
          <Link to={post.frontmatter.path}>
            <div className="date">{post.frontmatter.date.substring(4, 6)}</div>
            <div className="slash">/</div>
            <div className="title-blurb">
              <div className="title">{post.frontmatter.title}</div>
              <div className="slash">/</div>
              <div className="blurb">{post.excerpt}</div>
            </div>
          </Link>
        </div>
      </React.Fragment>
    ))

  return (
    <div className="blog-posts">
      <Helmet>
        <meta charSet="utf-8" />
        <title>j.sh – bl.g</title>
        <script
          src="https://kit.fontawesome.com/dc5c29d233.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
      <Header pages={["blog", "about", "contact"]} activePage="blog" />
      <div className="blog-posts-body">{body}</div>
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
