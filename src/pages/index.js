import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Header from "../components/Header"
import Footer from "../components/Footer"

import "../css/index.css"
//import { array } from "prop-types"

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  const [activeTags, setActiveTags] = useState([])
  // const [isLightMode, setLightMode] = useState(false)

  const filterOptions = post => {
    if (!activeTags.length) {
      return post.node.frontmatter.title.length > 0
    } else if (post.node.frontmatter.tags) {
      return activeTags.every(val => post.node.frontmatter.tags.includes(val))
    } else {
      return false
    }
  }

  const body = posts
    .filter(post => filterOptions(post))
    .map(({ node: post }, ind, arr) =>
      ind === 0 ||
      (ind > 0 &&
        post.frontmatter.date.slice(0, 3) !==
          arr[ind - 1].node.frontmatter.date.slice(0, 3)) ? (
        <>
          <div className="blog-post-month-divider">
            <div>{post.frontmatter.date.slice(0, 3)}</div>
            <div>/</div>
            <div className="line"></div>
          </div>
          <div className="blog-post-preview" key={post.id}>
            <Link to={post.frontmatter.path}>
              <div>{post.frontmatter.date.substring(4, 6)}</div>
              <div>/</div>
              <div className="title">{post.frontmatter.title}</div>
            </Link>
          </div>
        </>
      ) : (
        <div className="blog-post-preview" key={post.id}>
          <Link to={post.frontmatter.path}>
            <div>{post.frontmatter.date.substring(4, 6)}</div>
            <div>/</div>
            <div className="title">{post.frontmatter.title}</div>
          </Link>
        </div>
      )
    )

  return (
    <div className="blog-posts">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog Posts</title>
        <script
          src="https://kit.fontawesome.com/dc5c29d233.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
      <Header pages={["blog", "contact", "about"]} />
      <div className="blog-posts-body">{body}</div>
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
            path
            blurb
            tags
          }
        }
      }
    }
  }
`
