import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
//import Helmet from "react-helmet"

import "../css/blog-post.css"

export default function Template({ data }) {
  const { markdownRemark: post } = data
  const featuredImgFluid =
    post.frontmatter.featuredImg &&
    post.frontmatter.featuredImg.childImageSharp.fluid

  return (
    <div className="blog-post-container">
      {/*<Helmet title={`Poopy - ${post.frontmatter.title}`} />*/}
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        {featuredImgFluid && <Img fluid={featuredImgFluid} />}
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        featuredImg {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

// What would happen if we formatted post.html -> <div>{post.html}</div>
