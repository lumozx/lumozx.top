import * as React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"

import say from '.././../static/say'

const BlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const name = data.site.siteMetadata?.author?.name || ""

  let index = Math.floor((Math.random()*say.length))
  return (
    <div className="index">
      <SEO title={siteTitle} />
      <h1 className="index__title">{name}</h1>
      <h2 className="index__summary">{say[index]}</h2>
      <div className="index__link">
        <Link className="index__link-item" to="/list/">
          博客
        </Link>
        <Link className="index__link-item" to="/random/">
          老虎机
        </Link>
      </div>
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
          summary
        }
      }
    }
  }
`
