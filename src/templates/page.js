import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/Seo"

const pageTemplate = ({ data: {  page } }) => {
  const featuredImage = {
    fluid: page.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: page.featuredImage?.node?.alt || ``,
  }

  return (
    <Layout>
      <Seo 
        title={page?.seo?.title ? page.seo.title : page.title} 
        canonical={page?.seo?.canonical ? page.seo.canonical : false}
        description={page?.seo?.metaDesc ? page.seo.metaDesc : page.excerpt} 
        image={featuredImage}
      />

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{parse(page.title)}</h1>
          
          <p>{page.date}</p>

          {/* if we have a featured image for this post let's display it */}
          {/* featuredImage?.fluid && (
            <Image
              fluid={featuredImage.fluid}
              alt={featuredImage.alt}
              style={{ marginBottom: 50 }}
            />
          ) */}
        </header>

        {!!page.content && (
          <section itemProp="articleBody" className="the-content">{parse(page.content)}</section>
        )}

        <hr />

        <footer>
          <Bio />
        </footer>
      </article>
       
    </Layout>
  )
}

export default pageTemplate

export const pageQuery = graphql`
  query PageById(
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
            absolutePath
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


  }
`
