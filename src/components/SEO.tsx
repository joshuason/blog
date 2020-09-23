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
        baseUrl
      }
    }
  }
`

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
    url: `${defaults.baseUrl}${pathname}`,
    image: image ? `${defaults.baseUrl}${image}` : null,
  }

  return (
    <Helmet defer={false}>
      <meta charSet="utf-8" />

      <title>{seo.title}</title>

      <link rel="icon" href={favicon} />
      <link rel="canonical" href={seo.url} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={seo.description} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={image} />}
    </Helmet>
  )
}

export default SEO