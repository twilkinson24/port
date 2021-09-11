import React from 'react'

import IconGitHub from '../images/iconmonstr-github-5.svg'
import IconTwitter from '../images/iconmonstr-twitter-5.svg'
import IconLinkedin from '../images/iconmonstr-linkedin-5.svg'
import IconCodeWars from '../images/codewars.svg'

const Footer = () => {

  return (
      <footer className="primary-footer txt-center">
        <nav>
          <h3 className="sr-only">Taylor on Social Media</h3>
          <ul className="social-media-icons">
            <li>
              <a href="https://twitter.com/coding4tacos" target="_blank" rel="noreferrer">
                <span className="sr-only">Twitter</span>
                <img src={IconTwitter} alt="Taylor's twitter account" />
              </a>
            </li>
            <li>
            <a href="https://www.linkedin.com/in/taylor-wilkinson/" target="_blank" rel="noreferrer">
                <span className="sr-only">Linkedin</span>
                <img src={IconLinkedin} alt="Taylor's Linkedin account" />
              </a>
            </li>
            <li>
              <a href="https://github.com/twilkinson24" target="_blank" rel="noreferrer">
                <span className="sr-only">Github</span>
                <img src={IconGitHub} alt="Taylor's Github account" />
              </a>
            </li>
            <li>
              <a href="https://www.codewars.com/users/coding4tacos" target="_blank" rel="noreferrer">
                <span className="sr-only">Code Wars</span>
                <img src={IconCodeWars} alt="Taylor's Code Wars account" />
              </a>
            </li>
          </ul>
        </nav>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        And <a href="https://wordpress.org/">WordPress</a>
      </footer>
  )
}

export default Footer
