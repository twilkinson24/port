import React, {useState} from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import parse from "html-react-parser"
import DarkModeToggle from "../utils/DarkModeToggle"
import { some } from "lodash"

const SiteHeader = () => {
  const {
    twLogo,
    wp: {
      generalSettings: { title },
    },
    allWpMenu
  } = useStaticQuery(graphql`
    query HeaderDarkModeToggleQuery {
      twLogo: file(relativePath: { eq: "taylor-wilkinson-logo-orange-trans-bg.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(
            width: 200
            # placeholder: BLURRED
          )
        }
      }
      wp {
          generalSettings { 
            title
            description
          }
      }
      allWpMenu(filter: {locations: {eq: PRIMARY}}) {
        edges {
          node {
            id
            menuItems {
              nodes {
                id
                target
                url
                label
                linkRelationship
                path
              }
            }
          }
        }
      }
    }
  `)
  
  const logoImage = getImage(twLogo)
  const PrimaryNavMenuData = allWpMenu?.edges[0]?.node?.menuItems?.nodes
  const [navOpen, setNavOpen] = useState(false);

  const toggleNavMenu = () => setNavOpen(prevNavOpen => !prevNavOpen);
  console.log('tw logo  ')
  console.log(twLogo)

  return (
    <header className="global-header">

      <nav className={`primary-menu ${navOpen ? 'active' : null}`}>
        <button 
          id="menu-toggle-btn" 
          aria-expanded={navOpen ? true : false}
          onClick={toggleNavMenu}
        >
          <span className="sr-only">
            Main Navigation Menu
          </span>
          <span className="toggle-icon">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </span>
          <span className="close-text">close</span>
        </button>
        {PrimaryNavMenuData && <ul className="primary-menu-items" aria-labelledby="menu-toggle-btn">
          {PrimaryNavMenuData.map(menuItem => {
            return (
              <li
                key={menuItem.id}
                className="primary-menu-item"
              >  
                {menuItem.path.includes('https://') ? (
                  <a href={menuItem.url} target={menuItem.target}>
                    {menuItem.label}
                  </a>      
                ) : (
                  <Link to={menuItem.path}>
                    {menuItem.label}
                  </Link>  
                )}
              </li>
            )
          })}
          </ul>
        }
      </nav>

      {/* This one: https://codepen.io/kentonquatman/pen/xOjaPd */}
      <div className="site-title">
        <Link to="/" className="header-logo-link">
          <GatsbyImage 
            image={logoImage} 
            alt={title} 
            className="header-logo-img"
            src="taylor-wilkinson-logo-orange-trans-bg.png"
          />
          <h1 className="m0 sr-only">
            {parse(title)}
          </h1>
        </Link>
      </div>
      <DarkModeToggle />
    </header>
  )
}

export default SiteHeader