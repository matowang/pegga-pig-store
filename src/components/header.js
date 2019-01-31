import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import logo from '../images/peppa-pig-logo.png'
import '../sass/header.scss'

const Header = ({ siteTitle, setCurrency, currentCurrency }) => (
  <header id="header" className="nav-height">
    <img id="logo" src={logo} alt="Peppa Pig Logo" />
    <h1>
      <Link to="/">
        {siteTitle}
      </Link>
    </h1>
    <label id="currency-selector-label" htmlFor="currency-selector">Currency: </label>
    <select id="currency-selector" onChange={(e) => setCurrency(e.target.value)} value={currentCurrency}>
      <option value="hkd">HKD</option>
      <option value="twd">TWD</option>
    </select>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
