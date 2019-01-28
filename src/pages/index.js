import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ProductCard from '../components/product-card'

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Hi Peggas</h1>
        {this.props.data.allProductsJson.edges.map(({ node }) => {
          const { id, title, price, dimensions, imgs } = node;
          return (
            <ProductCard
              id={id}
              title={title}
              price={price.hkd}
              imgUrl={imgs[0]}
              width={dimensions.w}
              length={dimensions.l}
              height={dimensions.h}
              key={id}
            />
          )
        })}
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
        id
        title
        price {
          hkd
          twd
        }
        imgs
        dimensions {
          w
          l
          h
        }
      }
    }
  }
}
`