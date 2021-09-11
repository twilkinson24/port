/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Bio = () => {
  const { author } = useStaticQuery(graphql`
    query BioQuery {
      # if there was more than one user, this would need to be filtered
      author: wpUser {
        firstName
        lastName
        twitter: name
        description
        seo {
          social {
            twitter
          }
        }
        avatar {
          url
        }
      }
    }
  `)

  const avatarUrl = author?.avatar?.url

  const authorName = author ? `${author.firstName} ${author.lastName}` : 'Taylor' 

  return (
    <div className="bio">
      {avatarUrl && (
        <Link to="/about/" className="no-decoration mx-auto">
          <img
            alt={authorName}
            className="bio-avatar"
            src={avatarUrl}
          />
        </Link>
      )}
      {author?.firstName && (
        <p className="sr-only">
          By {authorName}
        </p>
      )}
    </div>
  )
}

export default Bio
