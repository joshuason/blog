import React, { useState } from "react"
import { Link, graphql } from "gatsby"
//import Helmet from "react-helmet"

import "../css/index.css"
//import { array } from "prop-types"

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  const [activeTags, setActiveTags] = useState([])

  const handleClick = tagName => {
    //console.log(tagName)
    if (!activeTags.includes(tagName)) {
      setActiveTags([...activeTags, tagName])
    } else {
      setActiveTags([...removeItemFromArr(activeTags, tagName)])
    }
  }

  const filterOptions = post => {
    if (!activeTags.length) {
      return post.node.frontmatter.title.length > 0
    } else if (post.node.frontmatter.tags) {
      return activeTags.every(val => post.node.frontmatter.tags.includes(val))
    } else {
      return false
    }
  }

  return (
    <div className="blog-posts">
      {posts
        .filter(post => filterOptions(post))
        .map(({ node: post }) => (
          <div className="blog-post-preview" key={post.id}>
            <h1>
              <Link to={post.frontmatter.path}>
                {post.frontmatter.title}{" "}
                <span>
                  {"/ "}
                  {post.frontmatter.date}
                </span>
              </Link>
            </h1>
            {post.frontmatter.tags && (
              <p className="tagline">
                {post.frontmatter.tags.map((tag, ind) => (
                  <TagItem
                    key={ind}
                    tag={tag}
                    active={activeTags.includes(tag) ? true : false}
                    onClick={() => handleClick(tag)}
                  />
                ))}
              </p>
            )}
            <p>{post.excerpt}</p>
          </div>
        ))}
    </div>
  )
}

function TagItem({ tag, active, onClick }) {
  return (
    <button className={active ? "tag active" : "tag"} onClick={onClick}>
      #{tag}
    </button>
  )
}

function removeItemFromArr(arr, val) {
  const ind = arr.indexOf(val)
  if (ind > -1) {
    arr.splice(ind, 1)
  }
  return arr
}

// // both args are arrays
// function containsAll(arr, vals) {
//   vals.forEach(val => {
//     console.log(arr, val, !arr.includes(val))
//     if (!arr.includes(val)) {
//       return false
//     }
//   })
//   return true
// }

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            blurb
            tags
          }
        }
      }
    }
  }
`
