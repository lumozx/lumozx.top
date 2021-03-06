import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import axios from "axios"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import tiger from "../../../static/tiger"
import * as randomStyle from "./random.module.scss"

class Random extends React.Component {
  constructor(props) {
    super(props)
    this.setPerson = this.setPerson.bind(this)
    this.buttonClick = this.buttonClick.bind(this)
    this.state = {
      person: [],
    }
  }
  setPerson() {
    const person = prompt("请输入人员,英文逗号分隔")
    if (person !== null && person !== "") {
      this.setState(
        {
          person: person.split(","),
        },
        () => {
          if (document.getElementById("toggle")) {
            const lottery = new tiger(
              document.getElementById("toggle"),
              document.querySelectorAll(".list")
            )
            document.getElementById("toggle").addEventListener("click", () => {
              lottery.draw()
            })
            lottery.on("start", async () => {
              if (this.state.person.length === 1) {
                lottery.setResult([0])
              } else {
                const res = await axios.get(
                  `https://www.random.org/integers/?num=1&min=1&max=${this.state.person.length}&col=1&base=10&format=plain&rnd=new`
                )
                setTimeout(() => {
                  lottery.setResult([Number(res.data) - 1])
                }, 500)
              }
            })
          }
        }
      )
    }
  }
  buttonClick(e){
    if(e.keyCode === 13) {
      this.setPerson()
    }
  }
  render() {
    let tigerCom = null
    if (this.state.person.length > 0) {
      const item = this.state.person.map(item => (
        <div className={randomStyle.item} key={`${item}${Math.random()}`}>
          {item}
        </div>
      ))
      tigerCom = (
        <div className={randomStyle.main}>
          <div className={randomStyle.out}>
            <div className={`${randomStyle.list} list`}>{item}</div>
          </div>
          <div id="toggle" className={randomStyle.toggle}>
            开始
          </div>
        </div>
      )
    }
    return (
      <StaticQuery
        query={pageQuery}
        render={data => {
          const siteTitle = data.site.siteMetadata.title
          return (
            <Layout location={this.props.location} title={siteTitle}>
              <SEO title="老虎机" />
              <div role = "button" tabIndex="0" onClick={this.setPerson} onKeyDown={this.buttonClick} className={randomStyle.setPerson}>
                初始化
              </div>
              <div className={randomStyle.person}>
                {this.state.person.join(",")}
              </div>
              {tigerCom}
            </Layout>
          )
        }}
      ></StaticQuery>
    )
  }
}

export default Random

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
