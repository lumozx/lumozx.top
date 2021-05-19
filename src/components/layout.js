import * as React from "react"
import { useStaticQuery,graphql } from "gatsby"


import Header from './header'

const Layout = ({children }) => {
  const data = useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`);
  const siteTitle = data.site.siteMetadata.title

  return (
    <div className="global-wrapper" >
      <Header siteTitle={siteTitle} />

      <main>{children}</main>

    </div>
  )
}

export default Layout