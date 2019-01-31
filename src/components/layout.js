import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'

import Header from './header'
import '../sass/normalize.css'
import '../sass/styles.scss'

class Layout extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Header siteTitle={data.site.siteMetadata.title} setCurrency={this.props.setCurrency} currentCurrency={this.props.currentCurrency} />
            <main>
              {this.props.children}
            </main>
            <footer>
              <Link to="about" >About</Link>
            </footer>
          </>
        )}
      />
    )
  }
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
