import React from 'react'
import { graphql } from 'gatsby'

import Body from '../components/Body'
import PageContainer from '../components/PageContainer'
import SEO from '../components/SEO'

import '../css/index.scss'

type MyProps = {}
type StateProps = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<MyProps, StateProps> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    return null
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }
    return <>{this.props.children}</>
  }
}

export default function Index({ data }) {
  //-- Merge posts from local and Contentful CMS
  const posts = [...data.allMdx.edges, ...data.allContentfulBlogPost.edges]
  //-- Sort posts
  posts.sort(({node: a}, {node: b}) => {
    const dates = {
      alpha: a.frontmatter ? a.frontmatter.date : a.publishDate,
      beta: b.frontmatter ? b.frontmatter.date : b.publishDate,
    }
    //-- new Date() may have performance issues... 
    const result = new Date(dates.alpha) < new Date(dates.beta) ? 1 : -1
    // console.log(dates.alpha, dates.beta, result)
    return result
  })
  // console.log({sortedPosts: posts})

  // const { edges: postsMalone } = data.allMdx

  return (
    <PageContainer activePage="blog" contentClassName={'Index'}>
      <SEO title="j.sh – bl.g" />
      <Body posts={posts} />
    </PageContainer>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }, filter: {frontmatter: {slug: {regex: "/.{1,}/"}}}) {
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
    allContentfulBlogPost(sort: {order: DESC, fields: publishDate}) {
      edges {
        node {
          id
          slug
          title
          description {
            childMdx {
              body
              excerpt
            }
          }
          publishDate(formatString: "MMM DD, YYYY")
        }
      }
    }
  }
`
