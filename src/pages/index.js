import React from 'react'
//import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Hi Peggas</h1>
        <button
          className="snipcart-add-item"
          data-item-id="2"
          data-item-name="Pegga Pig Toy"
          data-item-price="300.00"
          data-item-weight="20"
          data-item-url="https://angry-meitner-03adf1.netlify.com/"
          data-item-description="Fun toy for the Year of the Pig">
          Buy Pegga Toy
        </button>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          {/* <Image /> */}
        </div>
      </Layout>
    )
  }
}

export default IndexPage
