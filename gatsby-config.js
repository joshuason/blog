module.exports = {
  pathPrefix: "/blog",
  siteMetadata: {
    title: `Joshua S - Blog`,
    author: `@joshuas`,
  },
  plugins: [
    // Necessary plugins or else it breaks...
    `gatsby-transformer-sharp`, // finds image files to transform into sharp nodes
    `gatsby-plugin-sharp`, // processes images
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    // Transformer plugins convert data that is not inherently usable to a format Gatsby understands
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        // just in case these remark plugins sound cool :) -- Dustin Schau
        gatsbyRemarkPlugins: [
          // // add syntax highlighting with:
          // `gatsby-remark-prismjs`,
          // // copy relative files specified in markdown:
          // `gatsby-remark-copy-linked-files`,
          {
            // compress images and add responsive images with 'srcset':
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blog.Josh`,
        short_name: `Blog.Josh`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `src/images/icon-512x512.png`,
        crossOrigin: `anonymous`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/about`],
      },
    },
  ],
}
