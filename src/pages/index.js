import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ProductCard from '../components/product-card'

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'hkd'
    }
  }
  setCurrency = (currency) => {

    this.setState({ currency });
    window.Snipcart.setCurrency(currency);
  }
  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Hi Peggas</h1>
        <p>Currency: {this.state.currency}</p>
        <select onChange={e => this.setCurrency(e.target.value)}>
          <option value="hkd">HKD</option>
          <option value="twd">TWD</option>
        </select>
        {this.props.data.allMarkdownRemark.edges.map(({ node }) => {
          const { id, title, price, dimensions, imgs } = node.frontmatter;
          const imageEdge = this.props.data.allFile.edges.find(({ node }) => node.relativePath === imgs[0]);
          let imgUrl = '';
          if (imageEdge)
            imgUrl = imageEdge.node.publicURL;
          else
            console.log(imgs[0])
          return (
            <ProductCard
              id={id}
              title={title}
              price={price[this.state.currency]}
              currency={this.state.currency}
              imgUrl={imgUrl}
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