module.exports = {
  pathPrefix: "/blog",
  siteMetadata: {
    title: `Joshua S - Blog`,
    author: `@joshuas`,
  },
  plugins: [
    // Necessary plugins or else it breaks...
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // Functional plugins which provide functions (eg app like feel, ability to edit head tags)
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    // Source plugins create nodes which can then be transformed into a usable format by a transfomer plugin
    {
      resolve: `gatsby-source-filesystem`,
      // options object is passed to plugin
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    // Transformer plugins convert data that is not inherently usable to a format Gatsby understands
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // just in case these remark plugins sound cool :) -- Dustin Chau
        plugins: [
          // // add syntax highlighting with:
          // `gatsby-remark-prismjs`,
          // // copy relative files specified in markdown:
          // `gatsby-remark-copy-linked-files`,
          // // compress images and add responsive images with 'srcset':
          // `gatsby-remark-images`,
        ],
      },
    },
  ],
}
