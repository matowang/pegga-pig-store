import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

class IndexPage extends React.Component {
  render() {
    console.log(this.props.data);
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Hi Peggas</h1>
        <button
          className="snipcart-add-item"
          data-item-id="2"
          data-item-name="Pegga Pig Toy"
          data-item-price='{"hkd": 200.0, "twd": 1200}'
          data-item-weight="20"
          data-item-url="https://angry-meitner-03adf1.netlify.com/"
          data-item-description="Fun toy for the Year of the Pig">
          Buy Pegga Toy
        </button>
        <Link to="/test-page">test page</Link>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
query {
  allProductsJson {
    edges {
      node {
        title
        price {
          hkd
          twd
        }
      }
    }
  }
}
`