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
