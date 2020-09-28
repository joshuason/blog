import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import PageContainer from '../components/PageContainer'
// import Head from '../components/Head'

import '../css/blog-post.scss'
import SEO from '../components/SEO'

export default function Template({ data }) {
  const { mdx: post } = data
  const featuredImgFluid =
    post.frontmatter.featuredImg &&
    post.frontmatter.featuredImg.childImageSharp.fluid

  return (
    <PageContainer activePage="blog">
      <div className="blog-post-container">
        <SEO title={post.frontmatter.title} article={true} />
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
    mdx(frontmatter: { slug: { eq: $path } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
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
