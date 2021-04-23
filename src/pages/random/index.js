import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import axios from "axios"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import tiger from "../../../static/tiger"
import * as randomStyle from "./random.module.css"


const baseTime = 5

class Random extends React.Component {
  constructor(props) {
    super(props)
    this.setPerson = this.setPerson.bind(this)
    this.state = {
      person: [],
      time: baseTime,
      res: {
        data: 1,
      },
    }
  }
  setPerson() {
    const person = prompt("请输入人员,英文逗号分隔")
    if (person !== null && person !== "") {
      this.setState(
        {
          person: person.split(","),
          time: baseTime,
        },
        () => {
          if (document.getElementById("toggle")) {
            const lottery = new tiger(
              document.getElementById("toggle"),
              document.querySelectorAll(".list"),
              {
                aniMinTime:baseTime * 1000
              }
            )
            document
              .getElementById("toggle")
              .addEventListener("click", async () => {
                const res = await axios.get(
                  `https://www.random.org/integers/?num=1&min=1&max=${this.state.person.length}&col=1&base=10&format=plain&rnd=new`
                )
                this.setState(
                  {
                    res,
                  },
                  () => lottery.draw()
                )
              })
            lottery.on("start", async () => {
              this.setState({
                time: baseTime,
              })
              const time = setInterval(() => {
                this.setState({
                  time: this.state.time - 1,
                })
                if (this.state.time <= 0) clearInterval(time)
              }, 1000)

              if (this.state.person.length === 1) {
                lottery.setResult([0])
              } else {
                setTimeout(() => {
                  lottery.setResult([Number(this.state.res.data) - 1])
                }, 500);
              }
            })
          }
        }
      )
    }
  }
  render() {
    let tigerCom = null
    let time = null
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
          <a id="toggle" className={randomStyle.toggle} href="#!">
            开始
          </a>
        </div>
      )
      time = <div className={randomStyle.time}>{this.state.time}</div>
    }
    return (
      <StaticQuery
        query={pageQuery}
        render={data => {
          const siteTitle = data.site.siteMetadata.title
          return (
            <Layout location={this.props.location} title={siteTitle}>
              <SEO title="老虎机" />
              <div onClick={this.setPerson} className={randomStyle.setPerson}>
                初始化
              </div>
              <div className={randomStyle.person}>
                {this.state.person.join(",")}
              </div>
              {time}
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
