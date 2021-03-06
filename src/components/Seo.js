/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ title, canonical, description, image, lang, meta, isBlogPost = false }) => {
  const { wp, wpUser, twImage, allSite } = useStaticQuery(
    graphql`
      query {
        # if there's more than one user this would need to be filtered to the main user
        wpUser {
          seo {
            social {
              twitter
            }
          }
        }
        twImage: file(relativePath: { eq: "TaylorWilkinsonWebDeveloper-smm.jpg" }) {
          publicURL
        }
        allSite {
          edges {
            node {
              siteMetadata {
                siteUrl
              }
            }
          }
        }
      }
    `
  )

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          name: `canonical`,
          content: canonical,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:image`,
          content: allSite?.edges[0]?.node?.siteMetadata.siteUrl ? (allSite.edges[0].node.siteMetadata.siteUrl + twImage.publicURL) : '',
        },
        {
          property: `og:type`,
          content: isBlogPost ? `article` : `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: wpUser?.seo?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
        {
          property: `twitter:image`,
          content: allSite?.edges[0]?.node?.siteMetadata.siteUrl ? (allSite.edges[0].node.siteMetadata.siteUrl + twImage.publicURL) : '',
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default Seo

