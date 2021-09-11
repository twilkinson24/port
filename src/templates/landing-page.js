import React from "react"
import { graphql } from "gatsby"
// import Image from "gatsby-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import Seo from "../components/Seo"

const LandingPageTemplate = ({ data: {  page, wp } }) => {
  const featuredImage = {
    fluid: page.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: page.featuredImage?.node?.alt || ``,
  }

  return (
    <Layout isLandingPage={true}>
      <Seo 
        title={page?.seo?.title ? page.seo.title : page.title} 
        canonical={page?.seo?.canonical ? page.seo.canonical : false}
        description={page?.seo?.metaDesc ? page.seo.metaDesc : page.excerpt} 
      />
      <article
        className="landing-page"
        itemScope
        itemType="http://schema.org/Article"
      >
        {!!page.content && (
          <section itemProp="articleBody" className="content-wrap landing-page-content">{parse(page.content)}</section>
        )}
      </article>
    </Layout>
  )
}

export default LandingPageTemplate

export const pageQuery = graphql`
  query LandingPageById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current post by id
    page: wpPage(id: { eq: $id }) {
      id
      content
      title

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
      seo {
        canonical
        metaDesc
        opengraphDescription
        opengraphSiteName
        opengraphTitle
        opengraphUrl
        title
        schema {
          articleType
        }
      }
    }
    wp {
      allSettings {
        generalSettingsTitle
      }
    }
  }
`
