import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import logo from '../images/peppa-pig-logo.png'
import '../sass/header.scss'

const Header = ({ siteTitle }) => (
  <header id="header" >
    <img id="logo" src={logo} alt="Peppa Pig Logo" />
    <div>
      <h1>
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
