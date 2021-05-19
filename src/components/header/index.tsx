import * as React from "react"
import { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import {
  faMoon,
  faSun,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { useColorMode } from "theme-ui"

import "./index.scss"

const Header = props => {
  const [colorMode, setColorMode] = useColorMode()
  const [showToggle, hoverTheme] = useState(false)
    console.log(colorMode)
  const toggleTheme = () => {
    if (colorMode === "dark") {
      setColorMode("default")
    } else {
      setColorMode("dark")
    }
  }

  return (
    <header className="header">
      <div className="header__title">
        <Link to="/">
          <div className="header__title-img">
            <StaticImage
              className="bio-avatar"
              layout="fixed"
              formats={["auto", "webp", "avif"]}
              src="../../images/profile.jpeg"
              width={50}
              height={50}
              quality={95}
              alt="Profile picture"
            />
          </div>
        </Link>
        <Link to="/">
          <h1 className="header__title-text">Lumozx</h1>
        </Link>
      </div>
      <div className="header__control">
        <div
          className="header__control-hidden"
          style={{ opacity: showToggle ? 0.5 : 0 }}
        >
          <Icon
            icon={colorMode === "dark" ? faMoon : faSun}
            className="header__control-hidden-svg"
          />
          <Icon
            icon={faChevronRight}
            className="header__control-hidden-right"
          />
        </div>

        <Icon
          icon={colorMode === "dark" ? faSun : faMoon}
          className="header__control-mode"
          onMouseEnter={() => {
            hoverTheme(!showToggle)
          }}
          onMouseLeave={() => {
            hoverTheme(!showToggle)
          }}
          onClick={toggleTheme}
        />
      </div>
    </header>
  )
}

export default Header
