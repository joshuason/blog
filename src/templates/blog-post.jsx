import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import PageContainer from '../components/PageContainer'
// import Head from '../components/Head'

import '../css/blog-post.scss'
import SEO from '../components/SEO'
import CommentSection from '../components/Comments'

export default function Template({ data }) {

  const post = data.mdx || data.contentfulBlogPost
  // console.log(post)
  // const { mdx: post } = data
  const featuredImgFluid =
    data.mdx 
    ? (post.frontmatter.featuredImg &&
      post.frontmatter.featuredImg.childImageSharp.fluid)
    : post.heroImage
      ? post.heroImage.fluid
      : null
  
  const { title } = post.frontmatter || post
  const { body } = post.description 
    ? post.description.childMdx  
    : post

  return (
    <PageContainer activePage="blog" contentClassName="Blog-Post">
      <div className="blog-post-container">
        <SEO title={title} article={true} />
        <div className="blog-post">
          <h1>{title}</h1>
          {featuredImgFluid && (
            <Img
              fluid={featuredImgFluid}
              durationFadeIn={2000}
              draggable={false}
            />
          )}
          <MDXRenderer>{body}</MDXRenderer>
          {/* <MDXProvider components={{a: MyLink}}>
          <MDXRenderer>
          {body}
          </MDXRenderer>
            
          </MDXProvider> */}
        </div>
        <CommentSection slug="slugs-eh" />
      </div>
    </PageContainer>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($path: String!) {
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
    contentfulBlogPost(slug: { eq: $path }) {
      slug
      title
      description {
        childMdx {
          body
        }
      }
      heroImage {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
      }
      publishDate(formatString: "MMM DD, YYYY")
    }
  }
`
