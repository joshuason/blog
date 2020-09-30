import React from 'react'
import { graphql } from 'gatsby'

import Body from '../components/Body'
import PageContainer from '../components/PageContainer'
import SEO from '../components/SEO'

import '../css/index.scss'

const ErrorHandler = ({ children }) => <>{children}</>

export default function Index({ data }) {
  const { edges: posts } = data.allMdx

  return (
    <PageContainer activePage="blog" contentClassName={'Index'}>
      <SEO title="j.sh – bl.g" />
      <Body posts={posts} />
    </PageContainer>
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
            slug
          }
          excerpt(pruneLength: 250)
        }
      }
    }
  }
`
