import React from "react"

import Header from './Header'
import Footer from './Footer'


const Layout = ({ isLandingPage, isHomePage, children }) => {

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <Header />
      
      <main>{children}</main>
      
      <hr />
      <Footer />
    </div>
  )
}

export default Layout
