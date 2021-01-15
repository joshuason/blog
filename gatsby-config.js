require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const siteConfig = require('./siteConfig.js')

const contentfulConfig = {
  spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
  accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
}

if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
} 

module.exports = {
  pathPrefix: '/blog',
  siteMetadata: {
    title: `Joshua Son`,
    author: `@joshuason`,
    description: `Just a blog where I write about my trials and tribulations of learning GatsbyJS framework`,
    siteUrl: `https://www.joshuason.com`,
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
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
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
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        exclude: [`/404`, `/404.html`],
        createLinkInHead: true,
        addUncaughtPages: true,
      },
    },
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID ||
            siteConfig.gtag_id ||
            'none',
        ],
        gtagConfig: { anonymize_ip: true },
        pluginConfig: { head: true, respectDNT: true },
      },
    },
    {
      resolve: `gatsby-plugin-guess-js`,
      options: {
        GAViewID: siteConfig.gservice_view_id || `VIEW_ID`,
        minimumThreshold: 0.03,
        jwt: {
          client_email:
            siteConfig.gservice_client_email || `GOOGLE_SERVICE_ACCOUNT_EMAIL`,
          private_key:
            siteConfig.gservice_private_key ||
            `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`,
        },
        period: {
          startDate: new Date('2020-10-1'),
          endDate: new Date(),
        },
      },
    },
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
        icon_options: {
          purpose: `any maskable`,
        },
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
