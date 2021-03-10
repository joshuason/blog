const path = require('path')

// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post.jsx`)

  return graphql(`
    {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            excerpt(pruneLength: 250)
            body
            id
            frontmatter {
              date
              slug
              title
            }
          }
        }
      }
      allContentfulBlogPost {
        edges {
          node {
            id
            slug
            title
            description {
              id
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMdx.edges.forEach(({ node }) => {
      if (node.frontmatter.slug) {
        createPage({
          path: node.frontmatter.slug,
          component: blogPostTemplate,
          context: {},
        })
      } 
    })
    result.data.allContentfulBlogPost.edges.forEach(({node}) => {
      createPage({
        path: node.slug,
        component: blogPostTemplate,
        context: {},
      })
    })
  })
}

const { createRemoteFileNode } = require('gatsby-source-filesystem')
const { hasUncaughtExceptionCaptureCallback } = require('process')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
      featuredImg: File @link(from: "featuredImg___NODE")
    }

    type Frontmatter {
      title: String!
      featuredImgUrl: String
      featuredImgAlt: String
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  if (node.internal.type === 'Mdx' && node.frontmatter.featuredImgURL) {
    let fileNode = await createRemoteFileNode({
      url: node.frontmatter.featuredImgURL, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })

    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id
    }
  }
}

// Utilising the createPages API (Gatsby calls at build time with injected parameters)

// Using graphql to get all markdown nodes and making them available under the allMarkdownRemark
