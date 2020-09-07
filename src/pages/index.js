import React from "react"
import { graphql } from "gatsby"

import Body from "../components/Body"
import PageContainer from "../components/PageContainer"
import Head from "../components/Head"

import "../css/index.scss"

export default function Index({ data }) {
  const { edges: posts } = data.allMdx

  return (
    <PageContainer activePage="blog" contentClassName={"Index"}>
      <Head title={"j.sh - bl.g"} />
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
            path
          }
          excerpt(pruneLength: 250)
        }
      }
    }
  }
`
