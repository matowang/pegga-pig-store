import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ProductCard from '../components/product-card'

class IndexPage extends React.Component {
  render() {
    console.log(this.props.data.allFile);
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Hi Peggas</h1>
        {this.props.data.allMarkdownRemark.edges.map(({ node }) => {
          const { id, title, price, dimensions, imgs } = node.frontmatter;
          return (
            <ProductCard
              id={id}
              title={title}
              price={price}
              imgUrl={this.props.data.allFile.edges.find(({ node }) => node.relativePath === imgs[0]).node.publicURL}
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
  allFile(filter: { relativePath: { regex: "/images/products//" } extension: {regex: "/png|jpg/"}}) {
      edges {
        node {
          publicURL
          relativePath
        } 
      }
  }
  allMarkdownRemark(filter: { fileAbsolutePath: {regex: "/data/products/.+md$/"}}) {
    edges {
      node {
        fileAbsolutePath
        frontmatter {
          id
          title
          price {
            hkd
            twd
          } 
          dimensions {
            w
            l
            h
            unit
          } 
          imgs
        }
      } 
    }
  }
}
`