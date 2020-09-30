import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

const favicon = require('../images/favicon-32x32.png')

interface SEOProps {
  title?: string | null
  description?: string | null
  author?: string | null
  image?: string | null
  article?: boolean | null
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
      }
    }
  }
`

const structuredData = ({ title, author, description, image, url }) => {
  const data = {
    '@context': 'http://schema.org/',
    '@type': 'Blog',
    name: title,
    author: {
      '@type': 'Person',
      name: author,
    },
    description,
    image,
    url,
  }

  return JSON.stringify(data)
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  author,
  image,
  article,
}) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)

  const defaults = site.siteMetadata

  const seo = {
    title: title || defaults.title,
    description: description || defaults.description,
    author: author || defaults.author,
    url: `${defaults.siteUrl}${pathname}`,
    image: image ? `${defaults.siteUrl}${image}` : null,
  }

  return (
    <Helmet defer={false} htmlAttributes={{ lang: 'en' }}>
      <meta charSet="utf-8" />

      <title>{seo.title}</title>

      <link rel="icon" href={favicon} />
      <link rel="canonical" href={seo.url} />
      <link
        href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
        rel="stylesheet"
      />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={seo.description} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={image} />}

      <script
        src="https://kit.fontawesome.com/dc5c29d233.js"
        crossOrigin="anonymous"
      ></script>
      <script type="application/ld+json">{structuredData(seo)}</script>
    </Helmet>
  )
}

export default SEO
