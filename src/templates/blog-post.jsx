import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import PageContainer from "../components/PageContainer"
import Head from "../components/Head"

import "../css/blog-post.scss"

export default function Template({ data }) {
  const { mdx: post } = data
  const featuredImgFluid =
    post.frontmatter.featuredImg &&
    post.frontmatter.featuredImg.childImageSharp.fluid

  return (
    <PageContainer activePage="blog">
      <div className="blog-post-container">
        <Head title={post.frontmatter.title} />
        <div className="blog-post">
          <h1>{post.frontmatter.title}</h1>
          {featuredImgFluid && (
            <Img
              fluid={featuredImgFluid}
              durationFadeIn={2000}
              draggable={false}
            />
          )}
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
      </div>
    </PageContainer>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        featuredImg {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
