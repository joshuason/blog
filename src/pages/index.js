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

  const bodyGroupedByDate = posts
    .filter(post => filterOptions(post))
    .reduce((acc, { node: post }, ind, arr) => {
      const year = post.frontmatter.date.slice(-4)
      const month = post.frontmatter.date.slice(0, 3)
    }, [])

  return (
    <div className="blog-posts">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog Posts</title>
      </Helmet>
      <Header />
      <div className="blog-posts-body">
        {posts
          .filter(post => filterOptions(post))
          .map(({ node: post }, ind, arr) => {
            if (
              ind === 0 ||
              (ind > 0 &&
                post.frontmatter.date.slice(0, 3) !==
                  arr[ind - 1].node.frontmatter.date.slice(0, 3))
            ) {
              return (
                <>
                  <div className="blog-post-month-divider">
                    {post.frontmatter.date.slice(0, 3)} / -----------
                  </div>
                  <div className="blog-post-preview" key={post.id}>
                    <Link to={post.frontmatter.path}>
                      {post.frontmatter.date.substring(4, 6)}
                      {" / "}
                      <span className="title">{post.frontmatter.title}</span>
                    </Link>
                  </div>
                </>
              )
            }
            return (
              <div className="blog-post-preview" key={post.id}>
                <Link to={post.frontmatter.path}>
                  {post.frontmatter.date.substring(4, 6)}
                  {" / "}
                  <span className="title">{post.frontmatter.title}</span>
                </Link>
              </div>
            )
          })}
      </div>
      {/*<Footer />*/}
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
