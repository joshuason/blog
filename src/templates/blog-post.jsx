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
  
  const dateArray = post.frontmatter ? post.frontmatter.date.split(" ") : post.publishDate.split(" ")
  const date  = `${dateArray[1].slice(0,-1)} ${dateArray[0]} ${dateArray[2].slice(-2)}`
  

  return (
    <PageContainer activePage="blog" contentClassName="Blog-Post">
      {/* <div className="blog-post-container"> */}
        <SEO title={title} article={true} />
        <div className="Blog-Post-Article">
          {featuredImgFluid && (
            <Img
              fluid={featuredImgFluid}
              durationFadeIn={2000}
              draggable={false}
              className="Featured-Img"
            />
          )}
          <div className="title">
            <h1>{title}</h1>
            <div className="title-separator">
              <div className="title-separator-line"></div>
            </div>
            <p className="title-date">{date}</p>
          </div>
          <div className="body">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
          
          {/* <MDXProvider components={{a: MyLink}}>
          <MDXRenderer>
          {body}
          </MDXRenderer>
            
          </MDXProvider> */}
        </div>
        <CommentSection /*slug={"slugs-eh" || window.location.href.split("/").slice(-2, -1)[0]}*/ />
      {/* </div> */}
    </PageContainer>
  )
}

const Separator = ({ text }) => (
  <>
    <div className="separator">
      <div className="separator-line"></div>
    </div>
    <p className="title-date">{text}</p>
  </>
)

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
